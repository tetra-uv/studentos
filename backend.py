from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date, timedelta
import math


# =========================================================
# HOLIDAY CONFIGURATION
# =========================================================

FIXED_HOLIDAYS = [
    (1, 1),    # New Year's Day
    (1, 26),   # Republic Day
    (4, 14),   # Ambedkar Jayanti
    (5, 1),    # Labour Day
    (8, 15),   # Independence Day
    (10, 2),   # Gandhi Jayanti
    (12, 25)   # Christmas
]

VARIABLE_HOLIDAYS = {
    2026: [
        (3, 19),   # Holi
        (10, 12),  # Dussehra
        (11, 1)    # Diwali
    ],
    2027: [
        (3, 8),    # Holi
        (10, 2),   # Dussehra
        (10, 21)   # Diwali
    ]
}


def build_holidays(years):
    holidays = {}

    for year in years:
        year_holidays = set()

        for month, day in FIXED_HOLIDAYS:
            year_holidays.add(date(year, month, day))

        for month, day in VARIABLE_HOLIDAYS.get(year, []):
            year_holidays.add(date(year, month, day))

        holidays[year] = year_holidays

    return holidays


HOLIDAYS = build_holidays([2026, 2027])


# =========================================================
# FASTAPI SETUP
# =========================================================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# DATA MODEL
# =========================================================

class AttendanceInput(BaseModel):
    weekly_schedule: dict
    semester_start: date
    semester_end: date
    attendance_till: date
    current_percentage: float
    required_percentage: float


WEEKDAY_MAP = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday"
}


# =========================================================
# CORE LOGIC
# =========================================================

@app.post("/calculate")
def calculate_attendance(data: AttendanceInput):

    classes_so_far = 0
    total_semester_classes = 0

    current = data.semester_start

    while current <= data.semester_end:

        if current in HOLIDAYS.get(current.year, set()):
            current += timedelta(days=1)
            continue

        weekday = WEEKDAY_MAP[current.weekday()]
        daily_classes = data.weekly_schedule.get(weekday, 0)

        total_semester_classes += daily_classes

        if current <= data.attendance_till:
            classes_so_far += daily_classes

        current += timedelta(days=1)

    # ---------- STRICT ROUNDING RULES ----------
    attended_classes = math.floor(
        classes_so_far * data.current_percentage / 100
    )

    required_total_attendance = math.ceil(
        data.required_percentage / 100 * total_semester_classes
    )

    remaining_classes = max(
        total_semester_classes - classes_so_far, 0
    )

    must_attend = max(
        required_total_attendance - attended_classes, 0
    )

    can_bunk = max(
        remaining_classes - must_attend, 0
    )

    max_possible_attendance = round(
        (attended_classes + remaining_classes) * 100 / total_semester_classes,
        2
    ) if total_semester_classes > 0 else 0.0

    # ---------- STATUS ----------
    if must_attend > remaining_classes:
        status = "IMPOSSIBLE"
    elif must_attend == 0:
        status = "SAFE"
    else:
        status = "WARNING"

    return {
        "classes_so_far": classes_so_far,
        "attended_classes": attended_classes,
        "remaining_classes": remaining_classes,
        "must_attend": must_attend,
        "can_bunk": can_bunk,
        "max_possible_attendance": max_possible_attendance,
        "status": status
    }

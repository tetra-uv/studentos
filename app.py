import streamlit as st
from backend import calculate_attendance


# Page setup

st.set_page_config(
    page_title="Attendance Calculator",
    layout="centered"
)

st.title("Attendance Calculator")
st.caption("Wanna know how many classes you can bunk? Enter the required details to find out the truth ")

#Input form
with st.form("attendance_form"):

    st.subheader("Semester Dates")

    col1, col2, col3 = st.columns(3)
    with col1:
        semester_start = st.date_input("Semester Start Date")
    with col2:
        semester_end = st.date_input("Semester End Date")
    with col3:
        attendance_till = st.date_input("Attendance Recorded Till")

    st.subheader("Weekly Class Schedule")

    days = {}
    day_columns = st.columns(4)
    day_names = [
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday"
    ]

    for i, day in enumerate(day_names):
        with day_columns[i % 4]:
            days[day] = st.text_input(
                label=day,
                value="0",
                help="Number of classes on this day"
            )

    st.subheader("Attendance Information")

    col4, col5 = st.columns(2)
    with col4:
        current_percentage = st.text_input(
            "Current Attendance (%)",
            value="0"
        )
    with col5:
        required_percentage = st.text_input(
            "Minimum Required Attendance (%)",
            value="75"
        )

    calculate_clicked = st.form_submit_button("Calculate Attendance")

# Processing and output

if calculate_clicked:

    try:
        # Convert the inputs to proper types so that backend can process
        days = {day: int(count) for day, count in days.items()}
        current_percentage = float(current_percentage)
        required_percentage = float(required_percentage)

        # Basic date sanity check in order to avoid human errors 
        if semester_start > semester_end:
            st.error("Semester start date must be before semester end date.")
        elif not (semester_start <= attendance_till <= semester_end):
            st.error("Attendance date must lie within the semester duration.")
        else:
            # Call for backend logic
            result = calculate_attendance(
                days,
                semester_start,
                semester_end,
                attendance_till,
                current_percentage,
                required_percentage
            )

            st.subheader("Attendance Summary")

            r1, r2 = st.columns(2)
            r1.metric("Classes Completed", result["classes_so_far"])
            r2.metric("Classes Attended", result["attended_classes"])

            r3, r4 = st.columns(2)
            r3.metric("Classes Remaining", result["remaining_classes"])
            r4.metric("Must Attend", result["must_attend"])

            st.metric(
                "Classes You Can Bunk",
                result["can_bunk"]
            )

            if result["status"] == "SAFE":
                st.success(
                    "You are currently safe. You can afford to bunk some classes."
                )
            else:
                st.warning(
                    "You must attend the required number of classes to maintain your attendance."
                )
    except ValueError:
        st.error(
            "Please enter valid numeric values for class counts and percentages."
        )

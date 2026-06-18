// ---------- DOM REFERENCES ----------
// ---------- SUBJECT MODE STATE (ADD ONLY) ----------
let subjectMode = false;
const semesterStart = document.getElementById("semesterStart");
const semesterEnd = document.getElementById("semesterEnd");
const attendanceTill = document.getElementById("attendanceTill");

const currentPct = document.getElementById("currentPct");
const requiredPct = document.getElementById("requiredPct");

const mon = document.getElementById("mon");
const tue = document.getElementById("tue");
const wed = document.getElementById("wed");
const thu = document.getElementById("thu");
const fri = document.getElementById("fri");
const sat = document.getElementById("sat");
// ---------- SUBJECT MODE CONTROLS (ADD ONLY) ----------
function toggleSubjects() {
  subjectMode = !subjectMode;

  const section = document.getElementById("subjectSection");
  const btn = document.getElementById("toggleSubjects");

  if (!section || !btn) return;

  section.classList.toggle("hidden", !subjectMode);
  btn.textContent = subjectMode
    ? "Disable subject-wise entry"
    : "Enable subject-wise entry";
}

function addSubject() {
  const container = document.getElementById("subjects");
  if (!container) return;

  const row = document.createElement("div");
  row.className = "subject-row";

  row.innerHTML = `
    <input placeholder="Subject name">
    <input type="number" placeholder="Weekly classes">
    <button type="button" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(row);
}



async function calculate() {
  const btn = document.getElementById("calcBtn");
  const box = document.getElementById("result");

  // ---------- 1) Empty-date validation ----------
  const startVal = semesterStart.valueAsDate;
  const endVal = semesterEnd.valueAsDate;
  const tillVal = attendanceTill.valueAsDate;

  if (!startVal || !endVal || !tillVal) {
    box.classList.remove("hidden");
    box.innerHTML = `
      <div class="status warning">
        Please select semester start date, end date, and attendance till date.
      </div>
    `;
    return;
  }

  // ---------- 2) Date-order validation ----------
  semesterStart.classList.remove("input-error");
  semesterEnd.classList.remove("input-error");
  attendanceTill.classList.remove("input-error");

  if (!(startVal <= tillVal && tillVal <= endVal)) {
    box.classList.remove("hidden");
    box.innerHTML = `
      <div class="status warning">
        Date order is invalid.<br>
        Ensure: Semester Start ≤ Attendance Till ≤ Semester End.
      </div>
    `;

    if (startVal > tillVal) semesterStart.classList.add("input-error");
    if (tillVal > endVal) attendanceTill.classList.add("input-error");
    if (startVal > endVal) semesterEnd.classList.add("input-error");

    return;
  }

  // ---------- 3) Loading ----------
  btn.disabled = true;
  box.classList.remove("hidden");
  box.innerHTML = `<div class="loader"></div>`;

  // ---------- 4) Backend call ----------
  try {
    const payload = {
      weekly_schedule: {
        Monday: Number(mon.value) || 0,
        Tuesday: Number(tue.value) || 0,
        Wednesday: Number(wed.value) || 0,
        Thursday: Number(thu.value) || 0,
        Friday: Number(fri.value) || 0,
        Saturday: Number(sat.value) || 0
      },
      semester_start: semesterStart.value,
      semester_end: semesterEnd.value,
      attendance_till: attendanceTill.value,
      current_percentage: Number(currentPct.value) || 0,
      required_percentage: Number(requiredPct.value) || 75,

    };
    // ---------- SUBJECT DATA COLLECTION (ADD ONLY) ----------
    let subjects = null;

    if (inputs[0].value.trim() !== "") {
    subjects.push({
      name: inputs[0].value.trim(),
      weekly_classes: Number(inputs[1].value) || 0
    });
}


    // ---------- EXTEND PAYLOAD (ADD ONLY) ----------
    payload.subjects = subjects;

    const res = await fetch("http://127.0.0.1:8000/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Backend error");

    const d = await res.json();

    // ---------- 5) Risk meter ----------
    let riskPercent = 0;
    if (d.remaining_classes > 0) {
      riskPercent = Math.min(
        Math.round((d.must_attend / d.remaining_classes) * 100),
        100
      );
    }

    let statusClass = "warning";
    let explanation = "";

    if (d.status === "SAFE") {
      statusClass = "safe";
      explanation = "You are comfortably meeting the requirement. You can afford to miss some classes.";
    }
    if (d.status === "WARNING") {
      explanation = "Attendance is tight. Try to attend most upcoming classes to stay eligible.";
    }
    if (d.status === "IMPOSSIBLE") {
      statusClass = "impossible";
      explanation = "Even attending all remaining classes won’t meet the requirement. Consider special approval or extra classes.";
    }

    const tillReadable = tillVal.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    // ---------- 6) Render result ----------
    box.innerHTML = `
      <h2>Result</h2>

      <p class="text-muted">
        Attendance calculated up to <strong>${tillReadable}</strong>.
      </p>

      <div class="meter">
        <div class="meter-track">
          <div class="meter-fill ${statusClass}" style="width:${riskPercent}%"></div>
        </div>
        <div class="meter-label">
          Risk level: ${riskPercent}% of remaining classes must be attended
        </div>
      </div>

      <p><strong>Classes Completed:</strong> ${d.classes_so_far}</p>
      <p><strong>Classes Attended:</strong> ${d.attended_classes}</p>
      <p><strong>Remaining Classes:</strong> ${d.remaining_classes}</p>
      <p><strong>Must Attend:</strong> ${d.must_attend}</p>
      <p><strong>Can Bunk:</strong> ${d.can_bunk}</p>
      <p><strong>Max Possible Attendance:</strong> ${d.max_possible_attendance}%</p>

      <div class="status ${statusClass}">
        <strong>${d.status}</strong><br>
        ${explanation}
      </div>
    `;

    box.scrollIntoView({ behavior: "smooth" });

  } catch (err) {
    box.innerHTML = `
      <div class="status impossible">
        Failed to calculate. Please check inputs or backend.
      </div>
    `;
  } finally {
    btn.disabled = false;
  }
}

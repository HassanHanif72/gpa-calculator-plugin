document.addEventListener("DOMContentLoaded", function () {
    function calculateGPA() {
        let isWeighted = document.querySelector('input[name="gpa-type"]:checked').value === 'weighted';
        let semesters = document.querySelectorAll('.semester-container');
        let cumulativeGPA = 0;
        let totalCredits = 0;
        let semesterGPAs = [];

        semesters.forEach((semester, index) => {
            let courses = semester.querySelectorAll('.course-container');
            let semesterGPA = 0;
            let semesterCredits = 0;

            courses.forEach(course => {
                let grade = course.querySelector('.course-grade').value.toUpperCase();
                let credits = parseFloat(course.querySelector('.course-credits').value);
                let courseType = course.querySelector('.course-type').value;
                let points = getPoints(grade, courseType, isWeighted);

                if (points !== null) {
                    semesterCredits += credits;
                    semesterGPA += points * credits;
                }
            });

            if (semesterCredits > 0) {
                semesterGPA = semesterGPA / semesterCredits;
                semesterGPAs.push({
                    title: semester.querySelector('.semester-title').value || `Semester Title ${index + 1}`,
                    gpa: semesterGPA.toFixed(2)
                });
                cumulativeGPA += semesterGPA * semesterCredits;
                totalCredits += semesterCredits;
            }
        });

        if (totalCredits > 0) {
            cumulativeGPA = cumulativeGPA / totalCredits;
            document.getElementById('cumulative-gpa').textContent = cumulativeGPA.toFixed(2);
        } else {
            document.getElementById('cumulative-gpa').textContent = '0.00';
        }

        let semesterGPAContainer = document.getElementById('semester-gpas');
        semesterGPAContainer.innerHTML = '';
        if (semesterGPAs.length > 0) {
            semesterGPAs.forEach((semester) => {
                let semesterElement = document.createElement('div');
                semesterElement.classList.add('d-flex', 'align-items-center', 'justify-content-between');

                let titleElement = document.createElement('h3');
                let gpaElement = document.createElement('span');

                titleElement.textContent = semester.title;
                gpaElement.textContent = semester.gpa;

                semesterElement.appendChild(titleElement);
                semesterElement.appendChild(gpaElement);

                semesterGPAContainer.appendChild(semesterElement);
            });
        } else {
            let defaultElement = document.createElement('div');
            defaultElement.classList.add('d-flex','align-items-center','justify-content-between');

            let defaultTitle = document.createElement('h3');
            defaultTitle.textContent="Add Title";

            let defaultGpa = document.createElement('span');
            defaultGpa.textContent="0.00";

            defaultElement.appendChild(defaultTitle);
            defaultElement.appendChild(defaultGpa);
            semesterGPAContainer.appendChild(defaultElement);
        }
    }

    function getPoints(grade, courseType, isWeighted) {
        let basePoints;
        switch (grade) {
            case 'A+':
                basePoints = 4.0;
                break;
            case 'A':
                basePoints = 3.67;
                break;
            case 'A-':
                basePoints = 3.33;
                break;
            case 'B+':
                basePoints = 3.0;
                break;
            case 'B':
                basePoints = 2.67;
                break;
            case 'B-':
                basePoints = 2.33;
                break;
            case 'C+':
                basePoints = 2.0;
                break;
            case 'C':
                basePoints = 1.67;
                break;
            case 'C-':
                basePoints = 1.33;
                break;
            case 'D+':
                basePoints = 1.0;
                break;
            case 'D':
                basePoints = 0.67;
                break;
            case 'F':
                basePoints = 0.0;
                break;
            default:
                return null;
        }

        if (isWeighted) {
            switch (courseType) {
                case 'honors':
                    basePoints += 0.5;
                    break;
                case 'ap':
                    basePoints += 1.0;
                    break;
            }
        }

        return basePoints;
    }

  // Event listeners for adding/removing courses and semesters
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-course")) {
      let semesterContainer = event.target.closest(".semester-container");
      let courseId =
        semesterContainer.querySelectorAll(".course-container").length + 1;

      let courseContainer = document.createElement("div");
      courseContainer.classList.add("course-container");
      courseContainer.innerHTML = `
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-3">
                    <label for="course-name-${courseId}">Course Name:</label>
                    <input type="text" id="course-name-${courseId}" placeholder="Enter course name" class="course-name">
                </div>
                <div class="col-xl-3 col-lg-3 col-md-3">
                    <label for="course-grade-${courseId}">Grade:</label>
                    <select id="course-grade-${courseId}" class="course-grade">
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="C-">C-</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2">
                    <label for="course-credits-${courseId}">Credits:</label>
                    <input type="number" id="course-credits-${courseId}" placeholder="Enter credits" class="course-credits" value="1" min="0">
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2">
                    <label for="course-type-${courseId}">Course Type:</label>
                    <select id="course-type-${courseId}" class="course-type">
                        <option value="regular">Regular</option>
                        <option value="honors">Honors</option>
                        <option value="ap">AP</option>
                    </select>
                </div>
                <div class="col-xl-1 col-lg-1 col-md-2">
                    <span class="remove-course">×</span>
                </div>
            </div>
            `;
      event.target.parentNode.insertBefore(courseContainer, event.target);
    } else if (event.target.classList.contains("remove-course")) {
      let courseContainer = event.target.closest(".course-container");
      courseContainer.remove();
    } else if (event.target.classList.contains("add-semester")) {
      let semesterContainer = document.createElement("div");
      semesterContainer.classList.add("semester-container");
      semesterContainer.innerHTML = `
                <label for="semester-title">Semester Title:</label>
                <input type="text" id="semester-title" placeholder="Enter semester title" class="semester-title"><br><br>
                <div class="course-container">
                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-3">
                            <label for="course-name-1">Course Name:</label>
                            <input type="text" id="course-name-1" placeholder="Enter course name" class="course-name">
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3">
                            <label for="course-grade-1">Grade:</label>
                            <select id="course-grade-1" class="course-grade">
                                <option value="A+">A+</option>
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                                <option value="C+">C+</></option>
                                <option value="C">C</option>
                                <option value="C-">C-</option>
                                <option value="D+">D+</option>
                                <option value="D">D</option>
                                <option value="F">F</option>
                            </select>
                        </div>
                        <div class="col-xl-2 col-lg-2 col-md-2">
                            <label for="course-credits-1">Credits:</label>
                            <input type="number" id="course-credits-1" placeholder="Enter credits" class="course-credits" value="1" min="0">
                        </div>
                        <div class="col-xl-2 col-lg-2 col-md-2">
                            <label for="course-type-1">Course Type:</label>
                            <select id="course-type-1" class="course-type">
                                <option value="regular">Regular</option>
                                <option value="honors">Honors</option>
                                <option value="ap">AP</option>
                            </select>
                        </div>
                        <div class="col-xl-1 col-lg-1 col-md-2">
                            <span class="remove-course">×</span>
                        </div>
                    </div>
                </div>
                <button type="button" class="add-course">+ Add Course</button>
            `;
      event.target.parentNode.insertBefore(semesterContainer, event.target);
    } else if (event.target.classList.contains("remove-semester")) {
      let semesterContainer = event.target.closest(".semester-container");
      semesterContainer.remove();
    }

    calculateGPA();
  });

  // Event listener for semester title input
  document.addEventListener("input", function (event) {
    if (event.target.classList.contains("semester-title")) {
      calculateGPA();
    }
  });

  // Event listeners for course input changes
  document.addEventListener("input", function (event) {
    if (
      event.target.classList.contains("course-credits") ||
      event.target.classList.contains("course-grade") ||
      event.target.classList.contains("course-type")
    ) {
      calculateGPA();
    }
  });

  // Event listener for GPA type change
  document.querySelectorAll('input[name="gpa-type"]').forEach((radio) => {
    radio.addEventListener("change", calculateGPA);
  });

  calculateGPA(); // Initial calculation
});

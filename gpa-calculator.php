<?php
/*
Plugin Name: GPA Calculator
Description: GPA Calculator For Students.
Version: 1.0
Author: Hassan Hanif
*/


function advanced_gpa_calculator_shortcode() {
    ob_start();
    ?>

<!-- bootstrap -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
<!-- end -->
<!-- Calculator Style -->
<link rel="stylesheet" href="<?php echo plugins_url('assets/calculator.css', __FILE__); ?>">
<link rel="stylesheet" href="<?php echo plugins_url('assets/responsive.css', __FILE__); ?>">
<!-- end -->

<div id="gpa-calculator-container">
    <div class="row">
        <div class="col-xl-8 col-lg-8 col-md-7">
            <div id="gpa-calculator-form">
                <div class="semester-container" id="semester-1">
                    <label>Semester Title:</label>
                    <input type="text" placeholder="SEMESTER TITLE" class="semester-title"><br><br>
                    <div class="course-container">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-3">
                                <label>Course Name:</label>
                                <input type="text" placeholder="Course Name" class="course-name">
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-3">
                                <label>Grade:</label>
                                <select class="course-grade">
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
                                <label>Credits:</label>
                                <input type="number" placeholder="Credits" class="course-credits" value="1" min="0">
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-2">
                                <label>Course Type:</label>
                                <select class="course-type">
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
                </div>
                <button type="button" class="add-semester">+ Add Semester</button>
            </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-5">
            <div id="gpa-result">
                <h2>YOUR GPA</h2>
                <div class="d-flex align-items-center justify-content-between">
                    <input type="radio" id="weighted" class="btn-check" name="gpa-type" value="weighted"
                        autocomplete="off" checked>
                    <label class="btn btn-primary" for="weighted">WEIGHTED</label>


                    <input type="radio" id="unweighted" class="btn-check" name="gpa-type" value="unweighted"
                        autocomplete="off">
                    <label class="btn btn-primary" for="unweighted">UNWEIGHTED</label>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h3 class="text-color">Cumulative</h3>
                    <span id="cumulative-gpa">0.00</span>
                </div>
                <div id="semester-gpas"></div>
            </div>
        </div>
    </div>
</div>

<!-- Calculator Script -->
<script src="<?php echo plugins_url('assets/calculator.js', __FILE__); ?>"></script>
<!-- end -->

<?php
    return ob_get_clean();
}

add_shortcode('advanced_gpa_calculator', 'advanced_gpa_calculator_shortcode');
?>
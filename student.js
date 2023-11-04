let classes = null

let yourCourses = []
let uniqueCourses = []
let studentsEnrolled = [0,0,0,0,0,0,0]

const baseURL = 'http://127.0.0.1:5000'
const selfURL = "http://127.0.0.1:5501"

const getClasses = async () => {
    const response = await fetch(`${baseURL}/courses`);
    const myJson = await response.json();
    classes = myJson;
    getName()
    //displayMyClasses();
};

const getName = async () => {
    const response = await fetch(`${baseURL}/name`);
    const myJson = await response.json();
    student_name = myJson["name"];
    displayMyClasses();
};



function displayMyClasses() {
    //console.log("display called")
    if (classes == null) {
        return
    }
    
    
    // console.log(globalUsername)
    //console.log(classes[0])
    //console.log(window.globalUsername)
    
    classes.courses.forEach(course => {
        //console.log(typeof course.teacherName)
        if(course.studentName == student_name){
            let arr = []
            arr.push(course.className)
            arr.push(course.teacherName)
            arr.push(course.time)
            arr.push(course.capacity)
            yourCourses.push(arr)
        }

    });

    console.log(yourCourses)
    //console.log(classes)
    ///////CHANGE THIS TO COUNT ALL COURSES
    var index = 0
    for(let i = 0; i < yourCourses.length; i++) {
        //console.log(yourCourses[i])
        for(let j = 0; j < classes.courses.length; j++) {
            if(yourCourses[i][0] == classes.courses[j].className) {
                console.log(yourCourses[i])
                console.log(classes.courses[j])
                console.log("")
                studentsEnrolled[i] = studentsEnrolled[i] + 1;
            }
            // if(!uniqueCourses.includes(yourCourses[i][0])){
            //     uniqueCourses[index] = yourCourses[i][0]
            //     studentsEnrolled[index] = 1
            //     index++;
            // } else {
            //     let n = uniqueCourses.indexOf(yourCourses[i][0])
            //     studentsEnrolled[n] = studentsEnrolled[n] + 1
            // }  
        }     
    }
    //console.log(studentsEnrolled)
    //console.log(uniqueCourses)


    var courseSection = document.getElementById('student_body')
    $("#student_table tbody").empty()
    var index = 0
    var currRow 
  
    for(let j = 0; j < yourCourses.length; j++){
        //console.log(yourCourses[j])
      
            //console.log(yourCourses[j])

        var row = courseSection.insertRow(index)
        var courseName = row.insertCell(0)
        var teacherName = row.insertCell(1)
        var time = row.insertCell(2)
        var studentCount = row.insertCell(3)
        courseName.innerHTML = yourCourses[j][0]
        teacherName.innerHTML = yourCourses[j][1]
        time.innerHTML = (yourCourses[j][2])
        studentCount.innerHTML = `${studentsEnrolled[j]}/${yourCourses[j][3]}`
        index++
        
        
    }
       
    
    //console.log(classes)
    // console.log(uniqueCourses)
    // console.log(studentsEnrolled)
}

function ClassDetails(classId) {
    localStorage.setItem("course",classId)
    window.location.href = `${selfURL}/classDetails.html`
}

async function  LoadClasses() {
    let currCourse = localStorage.getItem("course")
    const response = await fetch(`${baseURL}/courses`);
    const myJson = await response.json();
    classes = myJson;

    var infoSection = document.getElementById('course_body')
    $("#courseinfo tbody").empty()
    var index = 0
    classes.courses.forEach(course => {
        //console.log(typeof course.teacherName)
        if(course.className == currCourse){
            var row = infoSection.insertRow(index)
            var studentName = row.insertCell(0)
            var studentGrade = row.insertCell(1)
            studentName.innerHTML = course.studentName
            studentGrade.innerHTML = course.grades   
            index++;
        }
    });
}
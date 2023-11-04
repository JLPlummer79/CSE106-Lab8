let classes = null

let yourCourses = []
let uniqueCourses = []
let studentsEnrolled = []


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
    teacher_name = myJson["name"];
    displayMyClasses();
};
function signOut() {
    window.location.href = "http://127.0.0.1:5501/";
};
document.getElementById("sign-out-link").addEventListener("click", signOut);



function displayMyClasses() {
    console.log("display called")
    if (classes == null) {
        return
    }
    
    
    // console.log(globalUsername)
    //console.log(classes[0])
    //console.log(window.globalUsername)
    
    classes.courses.forEach(course => {
        //console.log(typeof course.teacherName)
        if(course.teacherName == teacher_name){
            let arr = []
            arr.push(course.className)
            arr.push(course.teacherName)
            arr.push(course.time)
            arr.push(course.capacity)
            yourCourses.push(arr)
        }

    });

    //console.log(yourCourses)
    var index = 0
    for(let i = 0; i < yourCourses.length; i++) {
        //console.log(yourCourses[i])
        if(!uniqueCourses.includes(yourCourses[i][0])){
            uniqueCourses[index] = yourCourses[i][0]
            studentsEnrolled[index] = 1
            index++;
        } else {
            let n = uniqueCourses.indexOf(yourCourses[i][0])
            studentsEnrolled[n] = studentsEnrolled[n] + 1
        }        
    }

    var courseSection = document.getElementById('teacher_body')
    $("#courses_table tbody").empty()
    var index = 0
    var currRow 
    for(let i = 0; i < uniqueCourses.length; i++) {
        for(let j = 0; j < yourCourses.length; j++){
            //console.log(yourCourses[j])
            if (yourCourses[j][0] == uniqueCourses[i]){
                console.log(yourCourses[j])
                let button = document.createElement('button')
                button.id = uniqueCourses[i]
                button.innerText = uniqueCourses[i]
                button.setAttribute('onClick', `ClassDetails(this.id)`)
                var row = courseSection.insertRow(index)
                var courseViewButton = row.insertCell(0)
                var teacherName = row.insertCell(1)
                var time = row.insertCell(2)
                var studentCount = row.insertCell(3)
                courseViewButton.appendChild(button)
                teacherName.innerHTML = yourCourses[j][1]
                time.innerHTML = (yourCourses[j][2])
                studentCount.innerHTML = `${studentsEnrolled[i]}/${yourCourses[j][3]}`
                index++
                break;
            }
        }
       
    }
    console.log(classes)
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
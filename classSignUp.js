let classes = null

let yourCourses = []
let uniqueCourses = []
let studentsEnrolled = [0,0,0,0,0,0,0]

let addOrSubIndex = 0
let addOrSubArr = [0,0,0,0,0,0,0] 

var inclues = false
//student_name = ""

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

    //console.log(yourCourses)
    //console.log(classes)
    ///////CHANGE THIS TO COUNT ALL COURSES
    var index = 0
    for(let i = 0; i < classes.courses.length; i++) {
        //console.log(yourCourses[i])
        if(!uniqueCourses.includes(classes.courses[i].className)){
                uniqueCourses[index] = classes.courses[i].className
                studentsEnrolled[index] = 1
                index++;
            } else {
                let n = uniqueCourses.indexOf(classes.courses[i].className)
                studentsEnrolled[n] = studentsEnrolled[n] + 1
        }   
    }
    //console.log(studentsEnrolled)
    //console.log(uniqueCourses)
    console.log(yourCourses)


    var courseSection = document.getElementById('signup_body')
    $("#signup_table tbody").empty()
    var index = 0
    
    
    for(let i = 0; i < uniqueCourses.length; i++){
        for(let j = 0; j < classes.courses.length; j++){
            if (uniqueCourses[i] == classes.courses[j].className) {
                let button = document.createElement('button')
                addOrSub(uniqueCourses[i])
                addOrSubArr[addOrSubIndex] = j;
                /// + adds the student to the api, - removes the student from the course
                if(inclues) {
                    button.id = `${j}`
                    button.innerText = "-"
                    button.setAttribute('onClick', `removeClass(student_name, classes.courses[this.id].className)`)
                } else {
                    button.id = `${j}`
                    button.innerText = "+"
                    button.setAttribute('onClick', `addClass(classes.courses[this.id].className, classes.courses[this.id].teacherName
                        , classes.courses[this.id].time, classes.courses[this.id].capacity)`)
                }
                

                var row = courseSection.insertRow(index)
                var courseName = row.insertCell(0)
                var teacherName = row.insertCell(1)
                var time = row.insertCell(2)
                var studentCount = row.insertCell(3)
                var addButton = row.insertCell(4)
                addButton.appendChild(button)
                courseName.innerHTML = classes.courses[j].className
                teacherName.innerHTML = classes.courses[j].teacherName
                time.innerHTML = classes.courses[j].time
                studentCount.innerHTML = `${studentsEnrolled[i]}/${classes.courses[j].capacity}`
                index++
                addOrSubIndex++;
                break;
            }
        }
        
    }
       
    
    //console.log(classes)
    // console.log(uniqueCourses)
    // console.log(studentsEnrolled)
}


function addOrSub(c) {
    inclues = false
    let uCourses = []
   
    for(let i = 0; i < yourCourses.length; i++) {
        uCourses[i] = yourCourses[i][0]
    }

    if(uCourses.includes(c)){
        inclues = true
    }
    
}

const addClass = async (cName, tName, t, c) => {
    const response = await fetch(`${baseURL}/add`, {
        method: 'POST',
        body: JSON.stringify({
            className: cName,
            teacherName: tName,
            time: t,
            capacity: c,
            studentName: student_name,
            grade: 0
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json();
    getClasses()
};

const removeClass = async (sName, cName) => {
    const response = await fetch(`${baseURL}/${sName}/${cName}`, {
        method: 'DELETE'
    });
    const myJson = await response.json()
   
    gradeBook = myJson
    getClasses()
}


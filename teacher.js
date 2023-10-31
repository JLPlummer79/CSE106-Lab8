let classes = null

let teacher_name = ""

const baseURL = 'http://127.0.0.1:5000'

const getClasses = async () => {
    const response = await fetch(`${baseURL}/courses`);
    const myJson = await response.json();
    classes = myJson;
    getName()
    displayMyClasses();
};

const getName = async () => {
    const response = await fetch(`${baseURL}/name`);
    const myJson = await response.json();
    teacher_name = myJson["name"];
    displayMyClasses();
};



function displayMyClasses() {
    console.log("display called")
    if (classes == null) {
        return
    }
    var studentSection = document.getElementById('body')
    $("#courses_table tbody").empty()
    var index = 0
    // console.log(globalUsername)
    //console.log(classes[0])
    //console.log(window.globalUsername)
    
    classes.courses.forEach(course => {
        //console.log(typeof course.teacherName)
        if(course.teacherName == teacher_name){
            console.log("Course ID: " + course.id);
            console.log("Class Name: " + course.className);
            console.log("Teacher Name: " + course.teacherName);
            console.log("Time: " + course.time);
            console.log("Capacity: " + course.capacity);
        }
        

        
        // Output or process other properties as needed
    });

    for(course in classes.courses) {
        //console.log(course)
        
        // let button = document.createElement('button')
        // button.id = student
        // button.innerText = 'Delete'
        // button.setAttribute('onClick', `deleteStudent(this.id)`)
        // var row = studentSection.insertRow(index)
        // var deleteButton = row.insertCell(0)
        // var studentName = row.insertCell(1)
        // var studentGrade = row.insertCell(2)
        // deleteButton.appendChild(button)
        // studentName.innerHTML = student
        // studentGrade.innerHTML = gradeBook[student]
        index++;
    }
}
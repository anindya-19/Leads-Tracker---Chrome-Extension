let myLeads = []

// myLeads = JSON.parse(myLeads) //string to array
// console.log(typeof myLeads)
// myLeads.push("www.youtube.com")
// console.log(myLeads)
// myLeads = JSON.stringify(myLeads) // array to string
// console.log(typeof myLeads)


const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


// localStorage.setItem("myLead","https://google.com")
// console.log(localStorage.getItem("myLead"))
// localStorage.clear()


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) //parse -> string to array conversion

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}



// const tabs = [
//     {url:"https://www.linkedin.com/in/per-herald-borgen/"}
// ]


//save tab button actions
tabBtn.addEventListener("click",function() { 


    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)

        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })


})



//delete button actions
deleteBtn.addEventListener("dblclick",function(){ 
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


//input button actions
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)

    localStorage.setItem("myLeads",JSON.stringify(myLeads))

    render(myLeads)
    inputEl.value = '';

    console.log(localStorage.getItem("myLeads"))
})


function render(leads){
    let listItems = ""
    for(let i=0;i<leads.length;i++){
        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>" 

        //listItems += "<li><a href = '" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>"


        listItems += `
        <li>
            <a href = '${leads[i]}' target='_blank'>
                ${leads[i]}
            </a>
        </li>
        `

        // const li = document.createElement("li") 
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}

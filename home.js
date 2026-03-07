
function toggleBtn(id) {
    
   const allBtn = document.getElementById('allBtn');
    const openBtn = document.getElementById('openBtn');
    const closedBtn = document.getElementById('closedBtn');

    const selected = document.getElementById(id);

    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");
    selected.classList.add("btn-primary")

    if(id == "allBtn"){
        loadAllissue();
    }
    // else if(id =="openBtn"){
    //     loadOpenIssue();
    // }
    // else if(id == "closedIssue"){
    //     loadClosedIssue();
    // }
}


function loadAllissue() {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => allIssueCard(data.data))
}

const allIssueCard =(issue) =>{
    const allCardContainer = document.getElementById('all-card-container');
    allCardContainer.innerHTML = "";
console.log(issue)
   issue.forEach(element => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML = `
          <div class="cardd p-5 w-[280px] shadow-2xl rounded-2xl space-y-3 h-[300px]">
        <div class="flex justify-between">
           <img src="./assets/Open-Status.png" alt="">
           <button class="high">High</button>
        </div>
        <div>
          <h2 class="text-md font-semibold">${element.title}</h2>
          <p class="text-[#64748B] text-[13px]">The navigation menu doesn't collapse properly on mobile devices...</p>
        </div>
        <div>
          <button class="bg-red-100 text-red-500 px-3 rounded-4xl border border-red-500"><i class="fa-solid fa-bug"></i> Bug</button>
          <button class="bg-yellow-100 text-amber-600 px-3 rounded-4xl border border-amber-600"><i class="fa-solid fa-life-ring"></i> Help Wanted</button>
        </div><br>
        <hr class="opacity-50">

        <p class="text-[#64748B]">#Jon doe</p>
        <p class="text-[#64748B]">1/4/2026</p>

      </div>
    </div>
        `

        allCardContainer.appendChild(issueCard);
   });
}

loadAllissue();
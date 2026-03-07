const spinner = document.getElementById('spinner');
const allCard = document.getElementById('all-card-container');
let btnTrack ='allBtn';

function toggleBtn(id) {
    btnTrack = id;
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
    else if(id =="openBtn"){
        loadOpenIssue();
    }
    else if(id == "closedBtn"){
        loadClosedIssue();
    }
}

function showSpinner (){
    spinner.classList.remove('hidden');
    allCard.classList.add('hidden');
}
function hideSpinner (){
     spinner.classList.add('hidden');
    allCard.classList.remove('hidden');
}

const priorityCheck =(prio)=>{
    if(prio == "high"){
        return "high";
    }
    else if(prio == "medium"){
        return "medium";
    }
    else{
        return "low"
    }
}

const loadAllissue = async () => {
      showSpinner();
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res =await fetch(url);
    const data = await res.json();
    hideSpinner();
        allIssueCard(data.data);
        return data.data;
}

const allIssueCard =(issue) =>{
    const allCardContainer = document.getElementById('all-card-container');
    allCardContainer.innerHTML = "";
   issue.forEach(element => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML = `
          <div class="cardd p-5 shadow-xl rounded-2xl space-y-3 h-[300px] ${element.status == "open"? "border-t-3 border-t-green-500": "border-t-3 border-t-purple-500"} cursor-pointer" onclick='modalOpen(${element.id})' >
        <div class="flex justify-between">
           ${element.status == "open" ? '<img src="./assets/Open-Status.png" alt=""></img>' : '<img src="./assets/Closed- Status .png" alt=""></img>' } 
           <button class="${priorityCheck(element.priority)}">${element.priority.toUpperCase()}</button>
        </div>
        <div>
          <h2 class="text-md font-semibold mb-2">${element.title}</h2>
          <p class="text-[#64748B] text-[13px] line-clamp-2">${element.description}</p>
        </div>
        <div>
           ${element.labels[0]? `<button class="bg-yellow-100 text-sm text-amber-600 px-3 rounded-4xl border border-amber-600 ">${element.labels[0].toUpperCase()}</button>` : ""}
          ${element.labels[1]? `<button class="bg-yellow-100 text-sm text-amber-600 px-3 rounded-4xl border border-amber-600 ">${element.labels[1].toUpperCase()}</button>` : ""}
        </div>
        <hr class="opacity-50">

        <p class="text-[#64748B] text-sm">#${element.id} by${element.author}</p>
        <p class="text-[#64748B] text-sm">${element.createdAt}</p>

      </div>
    </div>
        `

        allCardContainer.appendChild(issueCard);
   });

   const issueCount = document.getElementById('issueCount');
   issueCount.innerText = allCardContainer.children.length;
}

const loadOpenIssue = async () => {
    const allIssue = await loadAllissue();
    const openFilter = allIssue.filter(element => element.status == "open")
    allIssueCard(openFilter);
}

const loadClosedIssue = async () => {
    const allIssue = await loadAllissue();
  const closeFilter = allIssue.filter(element => element.status == "closed");
    allIssueCard(closeFilter);
}

const loadSearchIssue =async () =>{
    const input = document.getElementById('searchInput');
    const inputVal = input.value.trim();
       if(inputVal === ""){
      return;
    }
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputVal}`);
    const searchFilter = await res.json();
    let searchData = searchFilter.data;

    if(btnTrack === "openBtn"){
       searchData = searchData.filter(element => element.status == "open")
    }
    else if(btnTrack === "closedBtn"){
       searchData = searchData.filter(element => element.status == "closed")
    }
   allIssueCard(searchData);
}

const modalOpen = async (id)=>{
    const modal = document.getElementById('my_modal');
    modal.showModal();
    const modalContent = document.getElementById('modal-contentt');
   
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const cardDetails = await res.json();
    const card = cardDetails.data;
    console.log(card);
    modalContent.innerHTML = `
    <h3 class="text-lg font-bold">${card.title}</h3>
     <button class="${card.status == "open"? "bg-green-600 rounded-4xl px-3 text-white": "bg-purple-600 rounded-4xl px-3 text-white"}">${card.status}</button>
      <div>
           ${card.labels[0]? `<button class="bg-yellow-100 text-sm text-amber-600 px-3 rounded-4xl border border-amber-600 ">${card.labels[0].toUpperCase()}</button>` : ""}
          ${card.labels[1]? `<button class="bg-yellow-100 text-sm text-amber-600 px-3 rounded-4xl border border-amber-600 ">${card.labels[1].toUpperCase()}</button>` : ""}
        </div>
         <p class="text-[#64748B] text-[14px]">${card.description}</p>
          <div class="flex justify-between items-center bg-[#F8FAFC] p-5">
            <div>
            <p class="text-[#64748B]">Assignee:</p>
            <p class="text-black font-bold">${card.assignee}</p>
        </div>
          <div>
            <p class="text-[#64748B]">Priority:</p>
            <p class="${priorityCheck(card.priority)}">${card.priority.toUpperCase()}</p>
        </div>
          </div>
    `

}

loadAllissue();
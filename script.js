const SHEET_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL";

document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(SHEET_URL);
  const data = await res.json();

  // Stats
  const totalDonors = data.length;
  const totalDonations = data.reduce((sum,d)=>sum + Number(d.TotalDonations || 0),0);
  const today = new Date().toISOString().slice(0,10);
  const todayDonation = data.filter(d=>d.LastDonate===today).length;

  document.getElementById("totalDonors").innerText = totalDonors;
  document.getElementById("totalDonations").innerText = totalDonations;
  document.getElementById("todayDonations").innerText = todayDonation;

  // Sort for new donors (latest by LastDonate)
  const newDonors = [...data].sort((a,b)=> new Date(b.LastDonate)-new Date(a.LastDonate)).slice(0,4);
  const topDonors = [...data].sort((a,b)=> b.TotalDonations - a.TotalDonations).slice(0,4);

  const newDonorsDiv = document.getElementById("newDonors");
  const topDonorsDiv = document.getElementById("topDonors");

  newDonors.forEach(d=>{
    newDonorsDiv.innerHTML += `
      <div class="donor">
        <img src="${d.PhotoURL}" alt="">
        <p>${d.Name}</p>
      </div>`;
  });

  topDonors.forEach(d=>{
    topDonorsDiv.innerHTML += `
      <div class="donor">
        <img src="${d.PhotoURL}" alt="">
        <p>${d.Name}</p>
        <small>${d.TotalDonations} বার দান করেছেন</small>
      </div>`;
  });
});

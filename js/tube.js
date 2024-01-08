// This function will fetch the name of tabs of categories 
const tabs = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
  const data = await response.json();
  const tabs = data.data;
  showTabs(tabs);
}

// This function will show the tab categories name
const showTabs = (tab) => {
  const videoCategories = document.getElementById('v-categories');

  tab.forEach(tabName => {
    // console.log(tabName);
    const tabDiv = document.createElement('div')

    tabDiv.innerHTML = `
    <a role="tab" onclick="loadData('${tabName.category_id}')" class="tab bg-gray-300 rounded">${tabName.category}</a>`

    videoCategories.appendChild(tabDiv);
  })
}

// This function will fetch the data of video cards
const loadData = async (id = '1000') => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
  const data = await response.json();
  const video = data.data;
  console.log(video);

  const noData = document.getElementById('no-data')

  if (video.length === 0) {
    noDataFound()
  }
  else {
    showData(video);
    noData.classList.add('hidden')
  }
}

// This function will show the data of video cards on web page
const showData = (data) => {
  // console.log(data);

  // Storing the id of card container 
  const videoConatiner = document.getElementById('video-conatiner')
  videoConatiner.innerHTML = '';

  // Looping throuhg each card with the help of forEach
  data.forEach(videos => {

    const postedDate = videos.others.posted_date ? new Date(videos.others.posted_date * 1000) : null;
    const hours = postedDate ? postedDate.getHours() : null;
    const minutes = postedDate ? postedDate.getMinutes() : null;

    // Creating a div element
    const div = document.createElement('div')
    div.classList = `card card-compact bg-white`

    // Setting innerHTML
    div.innerHTML = `
        <figure><img src="${videos.thumbnail}" alt="Shoes" /></figure>
        <div class="lg:ml-48 lg:top-36 ml-[500px] top-[330px] bg-[#171717] text-white rounded absolute">${hours && minutes ? `<div>${hours} min : ${minutes} sec</div>` : ''}</div>
        <div class="card-body">
        <div class="flex gap-2">
        <img class="rounded-full h-[50px] w-[50px]" src="${videos?.authors?.[0].profile_picture}" alt="author images">
        <h2 class="card-title">${videos.title}</h2>
        </div>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${videos?.authors?.[0].profile_name}</p>
          <div class="flex gap-1">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${videos?.others?.views} views</p>
          <div>${videos?.authors?.[0]?.verified}</div>
          </div>
        </div>
        `;

        // Appending the innerHTML to the video card container
    videoConatiner.appendChild(div);
  })
}

// This function will show the 'No Data Found' text when there is no data available
const noDataFound = () => {
  const noData = document.getElementById('no-data')
  noData.classList.remove('hidden')

  // Storing the video-container id for clearing the existing html
  const videoContainer = document.getElementById('video-conatiner')
  videoContainer.innerHTML = '';
}

// This function will sort the cards based on views in descending order
const sortByViews = () => {
  // Storing the video-container id
  const videoConatiner = document.getElementById('video-conatiner');
  // Converting the list of video cards into an array
  const videoCards = Array.from(videoConatiner.children);

  // Sort the video cards based on views in descending order
  videoCards.sort((a, b) => {
    const viewsA = parseInt(a.querySelector('.card-body > div > p').textContent);
    const viewsB = parseInt(b.querySelector('.card-body > div > p').textContent);
    
    // comparing views in descending order
    return viewsB - viewsA;
  });

  // Clear the existing content and append the sorted cards
  videoConatiner.innerHTML = '';
  videoCards.forEach(card => {
    videoConatiner.appendChild(card);
  });
}

// This function will redirect to another html page
const redirect = () =>{
  window.location.href = 'Blog.html';
}


tabs();
loadData();
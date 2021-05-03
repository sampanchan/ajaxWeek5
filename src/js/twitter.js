class TwitterApi{

    // same as localhost:8888
    API_BASE_URL = 'twitter-proxy.php'

    constructor(){

        this.setUpListener()
    }

    setUpListener(){
        const form = document.querySelector('form[name="twitter_search"]')
        form.addEventListener('submit', this.handleSearch);

    }
   


    handleSearch = (evt) => {
        evt.preventDefault()
        console.log('searching....')

        const term = document.querySelector('input[name="term"]').value  
        const data ={
            op: 'search_tweets',
            q: term,

        }
        const form = document.querySelector('form[name="twitter_search"]');
        form.reset();
        axios.get(this.API_BASE_URL, { params: data }).then(this.processResults).catch(this.handleError)
    }
    processResults = (data) => {
        const results = data.data.statuses
        console.log('we got data!', results)

        const tweetContainer = document.createElement('div');
        tweetContainer.setAttribute('class', 'tweet-container');
        const tweetResults = document.querySelector('.tweetResults');
        tweetResults.appendChild(tweetContainer);

        for (let i = 0; i < results.length; i++ ){


            const tweets = results[i]

           
            const userPhoto = tweets.user.profile_image_url
            const username = tweets.user.screen_name
            const name = tweets.user.name
            const tweetMessage = tweets.text
            const source = tweets.source
            const date = tweets.created_at
          
            

            // Twitter Item
            const tweetItemEl = document.createElement('div');
            tweetItemEl.setAttribute('class', 'tweet-item');
            tweetContainer.appendChild(tweetItemEl);

            //image- profile
            const userPhotoEl = document.createElement('img');
            tweetItemEl.appendChild(userPhotoEl);
            userPhotoEl.setAttribute('src', userPhoto);

            //Username
            const usernameEl = document.createElement('h3');
            tweetItemEl.appendChild(usernameEl);
            usernameEl.textContent = "@" + username ;

            //name
            const nameEl = document.createElement('h4');
            tweetItemEl.appendChild(nameEl);
            nameEl.textContent = name ;

            
            //tweet
            const tweetMessageEl = document.createElement('p');
            tweetItemEl.appendChild(tweetMessageEl);
            tweetMessageEl.textContent = tweetMessage;


            //date
            const dateEl = document.createElement('p');
            dateEl.setAttribute('class', 'date-item');
            tweetItemEl.appendChild(dateEl);
            dateEl.textContent = date;

            //source: iphone/android
            const sourceEl = document.createElement('a');
            sourceEl.setAttribute('class', 'source-item');
            sourceEl.innerHTML = source;
            tweetItemEl.appendChild(sourceEl);
            const sourceTextOnly = sourceEl.textContent;
            // sourceEl.textContent = source;




    }

    
}
handleError = (err) => {
    console.log('ERROR!', err)
}
}

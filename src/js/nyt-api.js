class NYT_SearchAPI {

    API_BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    API_KEY = 'CdyLSaf5xyJlIpqFXkXyEAbZ3E9h9iTS'

    constructor(){

        this.messageEl = document.querySelector('p.message')
        this.setUpListener()
    }

    setUpListener(){
        const form = document.querySelector('form[name="article_search"]')
        form.addEventListener('submit', this.handleSearch)

    }

    showMessage = (message) => {
        this.messageEl.innerHTML = message
    
    }

    handleSearch = (evt) => {
        evt.preventDefault()
        console.log('searching....')

        const term = document.querySelector('input[name="term"]').value
        const data = {
            q: term, 
            // begin_date:'',
            // end_date:'',
            'api-key': this.API_KEY

        }
        axios.get(this.API_BASE_URL, {params: data}).then(this.processResults)
        
    }

    processResults = (response) => {
        console.log('got results!', response)

        // parent container
        const articleContainer = document.createElement('div');
        articleContainer.setAttribute('class', 'article-Container');
        const classResults = document.querySelector('.classResults')
        classResults.appendChild( articleContainer);

       



        // for loop for abstracts
        var abstracts = response.data.response.docs
        console.log(abstracts.length)
        for (let i =0; i < abstracts.length; i++){
            // this.showMessage(abstracts[i].byline.original)
            // console.log(abstracts[i].byline)

            const doc = abstracts[i]
            const headline = doc.headline.main
            const webUrl = doc.web_url
            const photoUrl = doc.multimedia[0].url
            const summary =  doc.snippet
            const sectionName = doc.section_name
            const date = doc.pub_date
        
        //Article Item
        const articleItemEl = document.createElement('div');
        articleItemEl.setAttribute('class', 'article-item');
        articleContainer.appendChild(articleItemEl);

         //title
        const titleEl = document.createElement('h2');
        articleItemEl.appendChild(titleEl);

         //photo
         const photoEl = document.createElement('img');
         articleItemEl.appendChild(photoEl);
        photoEl.setAttribute('src',  'https://www.nytimes.com/' + photoUrl);

        //date
        const dateEl = document.createElement('p');
        dateEl.setAttribute('class', '.article-date');
        articleItemEl.appendChild(dateEl);

        //about/abstract
        const abstractEl = document.createElement('p');
        abstractEl.setAttribute('class', 'abstract-container');
        articleItemEl.appendChild(abstractEl);
        abstractEl.textContent = summary;

        //section_name
        const sectionNameEl = document.createElement('p');
        articleItemEl.appendChild(sectionNameEl);
        sectionNameEl.textContent = sectionName;

         // anchor-link
         const linkEl = document.createElement('a');
         articleItemEl.appendChild(linkEl);
         const headlineEl = document.createElement('h3');
         headlineEl.textContent = headline;
         linkEl.appendChild(headlineEl);
         linkEl.setAttribute('href', webUrl);
         linkEl.setAttribute('target', '_blank');
        }




        

        // get date on DOM
        // show more input fields 
    }
}

new NYT_SearchAPI()
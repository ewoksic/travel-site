import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll{
    constructor(els, thresholdPrecent){
        this.thresholdPrecent = thresholdPrecent
        this.itemsToReveal = els
        this.browserHeight = window.innerHeight
        this.hideInitially()
        this.scrollThrottle = throttle(this.calCaller, 200).bind(this)
        this.events()
    }
    events(){
        window.addEventListener('scroll', this.scrollThrottle)
        window.addEventListener('resize', debounce(() =>{
            console.log('resize jus run')
            this.browserHeight = window.innerHeight 
        }, 333))
       
    }
    calCaller(){
        console.log('scroll function ran')
        this.itemsToReveal.forEach(el => {
            if(el.isRevealed == false){
            this.calculateIfScrolledTo(el)
            }
        })
    }
    calculateIfScrolledTo(el){
        if(window.scrollY + this.browserHeight > el.offsetTop){
            console.log('el is calculate')
        let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100
        if (scrollPercent < this.thresholdPrecent){
            el.classList.add("reveal-item--is-visible")
            el.isRevealed = true
            if (el.isLastItem){
                window.removeEventListener("scroll", this.scrollThrottle)
            }
        }

        }
    }
    hideInitially(){
        this.itemsToReveal.forEach(el => {
            el.classList.add("reveal-item")
            el.isRevealed = false
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
    }
}


export default RevealOnScroll;
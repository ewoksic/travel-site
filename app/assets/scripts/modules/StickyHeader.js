import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'


class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header")
        this.pageSections = document.querySelectorAll(".page-section")
        this.previousScrollY = window.scrollY
        this.browserHeight = window.innerHeight

        this.events()
    }
    events() {
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200))
        window.addEventListener('resize', debounce(() => {
            this.browserHeight = window.innerHeight
        }, 333))
    }
    runOnScroll() {
        this.determineScrollDirection()
        if (window.scrollY > 60) {
            this.siteHeader.classList.add("site-header--dark")
        } else {
            this.siteHeader.classList.remove("site-header--dark")

        }
        this.pageSections.forEach(el => this.calSection(el))
    }
    determineScrollDirection(){
        if (window.scrollY > this.previousScrollY){
            this.scrollDirection = 'down'
        }else{
            this.scrollDirection = 'up'

        }
        this.previousScrollY = window.scrollY
    }
    calSection(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
            let scrollPrecent = el.getBoundingClientRect().top / this.browserHeight * 100
            if(scrollPrecent < 18 && scrollPrecent > -0.1 && this.scrollDirection == 'down' || scrollPrecent < 33 && this.scrollDirection == 'up'){
                let matchingLink = el.getAttribute("data-matching-link")
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"))
                document.querySelector(matchingLink).classList.add("is-current-link")
            }
        }
    }
}

export default StickyHeader;
import "./imports/sidebarActiveState"
import contentLoaded from "content-loaded"
import EQCSS from "eqcss"
import HeadingLinks from "./imports/headingLinks"
import LazySizes from "lazysizes"
import LightBox from "./imports/lightbox"
import Nav from "./imports/nav"
import Search from "./imports/algoliaSearch/instantSearch"
import SmoothScroll from "./imports/smoothScroll"
import Shuffle from "shufflejs"
import Sticky from "./imports/sticky"
import {setCodeTabs, initCodeTabs} from "./imports/code-tabs"

window.setCodeTabs = setCodeTabs
/**
 * Don't fire application logic
 * until the DOM is ready
 */
console.log("inside scripts")
contentLoaded().then(() => {
  console.log("inside content")
  console.log(process.env.ALGOLIA_APP_ID)
  console.log(process.env.ALGOLIA_SEARCH_KEY)
  console.log(process.env.ALGOLIA_ADMIN_KEY)
  const isHome = document.body.classList.contains("home")
  const isDocs = document.body.classList.contains("section-docs")
  const isBlogs = document.body.classList.contains("section-blogs")

  /**
   * Enable navbar logic
   */
  const nav = new Nav()

  /**
   * Enable search
   */
  try {
    if (isHome) {
      new Search(
        process.env.ALGOLIA_APP_ID,
        process.env.ALGOLIA_SEARCH_KEY,
        "dist"
      )
    } else if (isDocs) {
      new Search(
        process.env.ALGOLIA_APP_ID,
        process.env.ALGOLIA_SEARCH_KEY,
        "docs"
      )
    } else if (isBlogs) {
      console.log(isBlogs)
      new Search(
        process.env.ALGOLIA_APP_ID,
        process.env.ALGOLIA_SEARCH_KEY,
        "blogs"
      )
    }
  } catch (err) {
    console.warn(err)
  }

  /**
   * Enable heading links
   */
  const headingLinks = new HeadingLinks([
    ".technical-blog",
    ".docs-content .container"
  ])

  /**
   * Actvate smooth scrolling for the entire
   * website for hash links
   */
  SmoothScroll()

  /**
   * Enable position sticky for certain elements
   */
  const sticky = new Sticky([".blog-header--sticky", ".search-header--sticky"])

  /**
   * Enable lightboxes for images
   */
  const lightBoxes = new LightBox([".md-content img:not(.no-lightbox)"])

  /**
   * Tabbed code snippets
   */
  initCodeTabs()
})

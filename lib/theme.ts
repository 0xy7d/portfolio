/** Runs before paint so a stored dark theme never flashes light. */
export const themeScript = `try{if(localStorage.getItem("portfolio-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`

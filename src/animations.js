export const animeInput = {
    hidden: {
        x: "1000px",
        opacity: 0,
    },
    show: {
        x: "0px",
        opacity: 1,
        transition: {
            //type: "spring"
             duration: 0.75,
             delay: 1,
            // ease: "backInOut"
        }
    }
}
export const popup = {
    hidden: {
        opacity: 0,
        scale: 0.2
    },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.75,
            ease: 'easeOut'
        }
    },
    exit: {
        opacity: 0,
        scale: 0.2
    }
}
export const showToTop = {
    hidden: {
        y: "-4em",
        opacity: 0,
    },
    show: {
        y: "0em",
        opacity: 1,
        transition: {
             duration: 0.75
        }
    }
}
export const showText = {
    hidden: {
        y: "50px"
    },
    show: {
        y: "0px",
        transition: {
            duration: 0.75,
            delay: 0.75
        }
    }
}
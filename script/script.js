document.addEventListener("DOMContentLoaded", function () {
    // process bar
    setTimeout(function () {
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 3000);
})

function runAnimations() {
    // Example GSAP animations
    gsap.from(".main-title", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from(".sub-title", { opacity: 0, y: 50, duration: 1, delay: 1 });
    gsap.from(".content-item", { opacity: 0, y: 50, duration: 1, delay: 1.5, stagger: 0.2 });
    // Add more animations as needed
}

// // trigger to play music in the background with sweetalert
// window.addEventListener('load', () => {
//     Swal.fire({
//         title: 'Apakah kamu siap?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Iya',
//         cancelButtonText: 'Tidak',
//         customClass: {
//             popup: 'custom-popup', // Custom class for the popup
//         },
//         // Optionally, you can set additional styles for buttons, title, etc.
//     }).then((result) => {
//         if (result.isConfirmed) {
//             document.querySelector('.song').play();
//             animationTimeline();
//         } else {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Pilih "Iya" yaa..',
//                 confirmButtonColor: '#3085d6',
//                 confirmButtonText: 'Ok',
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     location.reload();
//                 }
//             })
//         }
//     });
// });

// Countdown function
function countdownToDate(targetDate) {
    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {
        // Tambahkan kelas "hidden" untuk menyembunyikan countdown
        document.getElementById('countdown-container').classList.add('hidden');
        
        // SweetAlert muncul
        Swal.fire({
            title: 'Apakah kamu siap?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya',
            cancelButtonText: 'Tidak',
            customClass: {
                popup: 'custom-popup',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                document.querySelector('.song').play();
                animationTimeline(); // Call your animation function
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Pilih "Iya" yaa..',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                }).then(() => location.reload());
            }
        });
    } else {
        // Update countdown display setiap detik
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;

        setTimeout(() => countdownToDate(targetDate), 1000);
    }
}

// Set target date to 00:00 January 25, 2025
const targetDate = new Date("January 25, 2025 00:00:00").getTime();

// Start countdown
countdownToDate(targetDate);


// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();

    tl.to(".container", 0.6, {
        visibility: "visible"
    })
        .from(".one", 0.7, {
            opacity: 0,
            y: 10
        })
        .from(".two", 0.9, {
            opacity: 0,
            y: 10
        })
        .to(".one", 0.7, {
            opacity: 0,
            y: 10
        }, "+=3.5")
        .to(".two", 0.7, {
            opacity: 0,
            y: 10
        }, "-=1")
        .from(".three", 0.7, {
            opacity: 0,
            y: 10
        })
        .to(".three", 0.7, {
            opacity: 0,
            y: 10
        }, "+=3")

        // Show `.five.idea-2` first
        .from(".idea-1", 0.7, ideaTextTrans)
        .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-2", 0.7, ideaTextTrans)
        .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")

        // After `.five.idea-2`, show `.four.textbox`
        .from(".four", 0.7, {
            scale: 0.2,
            opacity: 0,
        })
        .from(".fake-btn", 0.3, {
            scale: 0.2,
            opacity: 0,
        })
        .staggerTo(".hbd-chatbox span", 1.5, {
            visibility: "visible",
        }, 0.05)
        .to(".fake-btn", 0.1, {
            backgroundColor: "rgb(127, 206, 248)",
        }, "+=4")
        .to(".four", 0.5, {
            scale: 0.2,
            opacity: 0,
            y: -150
        }, "+=1")
        .from(".idea-3", 0.7, ideaTextTrans)
        .to(".idea-3 strong", 0.5, {
            scale: 1.2,
            x: 10,
            backgroundColor: "rgb(21, 161, 237)",
            color: "#fff",
        })
        .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-4", 0.7, ideaTextTrans)
        .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-5", 0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        }, "+=1.5")
        .to(".idea-5 span", 0.7, {
            rotation: 90,
            x: 8,
        }, "+=1.4")
        .to(
            ".idea-5",
            0.7, {
            scale: 0.2,
            opacity: 0,
        },
            "+=2"
        )
        .staggerFrom(
            ".idea-6 span",
            0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        },
            0.2
        )
        .staggerTo(
            ".idea-6 span",
            0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        },
            0.2,
            "+=1.5"
        )
        .staggerFromTo(
            ".baloons img",
            2.5, {
            opacity: 0.9,
            y: 1400,
        }, {
            opacity: 1,
            y: -1000,
        },
            0.2
        )
        .from(
            ".profile-picture",
            0.5, {
            scale: 0.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        },
            "-=2"
        )

        .staggerFrom(".wish-hbd span", 0.7, {
            opacity: 0,
            y: -50,
            // scale: 0.3,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
        },
            0.1
        )
        .staggerFromTo(
            ".wish-hbd span",
            0.7, {
            scale: 1.4,
            rotationY: 150,
        }, {
            scale: 1,
            rotationY: 0,
            color: "rgb(127, 206, 248)",
            ease: Expo.easeOut,
        },
            0.1,
            "party"
        )
        .from(
            ".wish h5",
            0.5, {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
        },
            "party"
        )
        .staggerTo(
            ".eight svg",
            1.5, {
            visibility: "visible",
            opacity: 0,
            scale: 80,
            repeat: 3,
            repeatDelay: 1.4,
        },
            0.3
        )
        .to(".six", 0.5, {
            opacity: 0,
            y: 30,
            zIndex: "-1",
        })
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        .to(
            ".last-smile",
            0.5, {
            rotation: 90,
        }, ".kadoo",
            "+=1"
        );

    function wa(isi) {
        open("https://wa.me/6285608107370?text=" + isi)
    }

    // Wishes
    async function makeawish() {
        var { value: kado } = await swal.fire({
            title: 'Terima kasih atas waktunya ya vii',
            confirmButtonColor: '#2fe96b',
            confirmButtonText: 'Kirim ✈',
            input: 'text',
            showCancelButton: false
        });

        if (kado) {
            await swal.fire({
                title: 'Kirim ke WA aja',
                confirmButtonColor: '#2fe965',
                confirmButtonText: 'Kirim ✈'
            });
            wa(kado);
        } else {
            await swal.fire({
                icon: 'error',
                title: 'Jangan dikosongin dong!!!'
            });
            makeawish();
        }
    }

    const replyBtn = document.getElementById("wishes");
    replyBtn.addEventListener("click", async () => {
        await makeawish();
    });
}
 
     let taxSwitch = document.getElementById("switchCheckDefault");
    taxSwitch.addEventListener("click", () => {
      let taxinfo = document.getElementsByClassName("tax-info");
        for(info of taxinfo){
            if(info.style.display != "inline"){
                info.style.display = "inline"
            }else{
                info.style.display = "none"
            }
        }
    });
    
  const track = document.getElementById('scrollTrack');
  const leftBtn = document.getElementById('btnLeft');
  const rightBtn = document.getElementById('btnRight');
  const STEP = 220; // px per click (tweak if needed)

  leftBtn.addEventListener('click', () => {
    console.log('left clicked, scrollLeft:', track.scrollLeft);
    // clamp new position so it never goes negative
    const newLeft = Math.max(0, track.scrollLeft - STEP);
    track.scrollTo({ left: newLeft, behavior: 'smooth' });
    // update after a short delay (smooth scroll)
    setTimeout(updateButtons, 200);
  });

  rightBtn.addEventListener('click', () => {
    console.log('right clicked, scrollLeft:', track.scrollLeft);
    const max = track.scrollWidth - track.clientWidth;
    const newLeft = Math.min(max, track.scrollLeft + STEP);
    track.scrollTo({ left: newLeft, behavior: 'smooth' });
    setTimeout(updateButtons, 200);
  });

  // enable/disable arrows
  function updateButtons() {
    const max = track.scrollWidth - track.clientWidth;
    leftBtn.disabled = track.scrollLeft <= 0;
    rightBtn.disabled = track.scrollLeft >= max - 1;
  }

  track.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  setTimeout(updateButtons, 100); // initial
 

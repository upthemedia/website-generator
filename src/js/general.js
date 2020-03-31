const generalFn = function () {
  const height = window.innerHeight;
  const menuHeight = document.getElementById('headerNav').offsetHeight;

  document.querySelectorAll( '.mHeight100' ).forEach( function ( el ) {
    el.style.minHeight = `${height - menuHeight}px`;
  } );
};
export default generalFn;

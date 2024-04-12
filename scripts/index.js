const index = {};

index.$menu = $('#sideMenu');
index.$navItem = $('.navItem');
index.$navItemName = $('.navItemName')
index.$home = $('#home');
index.$about=$('#about');
index.$skills = $('#skills');
index.$works = $('#works');
index.$contact = $('#contact');
index.$menuButton = $('#menuButton');
index.$scrollDown = $('#scrollDown');
index.isOpen = false;

// Fonction de scroll
index.scroll = function(target) {
  $('html,body').animate({ scrollTop: $(target).offset().top }, 500);
}

// Bouton du menu 
index.showHideMenu = function() {
  index.$menu.toggleClass('sideMenuHide sideMenuShow');
  index.isOpen = !index.isOpen;
}

// Mobile chargement inital
if ($(window).width() <= 990) {
  index.$menu.addClass('sideMenuHide').removeClass('sideMenuShow');
  index.$scrollDown.hide();
}

index.eventListeners = function() {
  // redimension entre un écran large et petit
  $(window).on('resize', function() {
    if ($(window).width() > 990) {
      index.$menu.removeClass('sideMenuHide').addClass('sideMenuShow')
      index.$scrollDown.show();
      index.isOpen= false;
    } else {
      index.$menu.removeClass('sideMenuShow').addClass('sideMenuHide');
      index.isOpen = false;
      index.$scrollDown.hide();
    }
  });

  // navigation menu click event scroll
  $('a[href*=\\#]').on('click', function () {
    index.scroll(this.hash);
  });

  // bouton du menu click event
  index.$menuButton.on('click', index.showHideMenu);

  // Menu caché au click
  index.$navItem.on('click', function() {
    if (index.isOpen) {
      index.showHideMenu();
    }
  });

  // Bouton menu
  index.$menuButton.on('keypress', function(e){
    if (e.which === 13) {
      $(this).trigger('click');
    }
  })
}

// initialisation
index.init = function() {
  index.eventListeners();
}

// Document 
$(function() {
  index.init();
})

/* FORMULAIRE DE CONTACT */
  window.addEventListener("DOMContentLoaded", function() {
// Sélectionnez le formulaire par son ID
  const form = document.getElementById("contactForm");
        
// événement de soumission du formulaire
  form.addEventListener("submit", function(event) {
// Empêchez l'envoi par défaut du formulaire
  event.preventDefault();
            
// données du formulaire
  const formData = new FormData(form);
            
// Envoyez les données à Formspree / Req Fetch
  fetch(form.getAttribute("action"), {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            })
            .then(response => {
              if (response.ok) {
//  message de succès si la soumission est réussie
                alert("Votre message a été envoyé avec succès!");
// Réinitialisez le formulaire
                  form.reset();
                } else {
//  message d'erreur si la soumission a échoué
                alert("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.");
                }
            })
            .catch(error => {
//  un message d'erreur si une erreur de réseau s'est produite
                alert("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.");
      });
  });
});


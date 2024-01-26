(function (Drupal) {
  Drupal.behaviors.consentYoutube = {
    attach: function attach(context) {
      document.body.addEventListener('dbconsentupdate', function (e) {
        if (
          "personalization_storage" in e.detail
          && e.detail.personalization_storage === "granted"
        ) {
          window.location.reload();
        }
      });
    }
  }
})(Drupal);

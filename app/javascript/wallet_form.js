$(document).on('turbolinks:load', function() {
  $(document).on('input', '.wallet-form [name="wallet[name]"]', function() {
    var currencyName = $(this).val();
    var codeInput = $('.wallet-form [name="wallet[code]"]');


    var code = determineCode(currencyName);


    codeInput.val(code);
  });

  function determineCode(currencyName) {

    return 'CODE';
  }
});

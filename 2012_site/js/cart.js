$(document).ready(function(){
    $('a.add-to-cart').click(function(){
        var item_id = $(this).attr('data-id');
        console.log('Item: ' + item_id);

        $.ajax({
            url: "/cart/add/",
            type: "POST",
            cache: false,
            context : this,
            data: { item_id: item_id,
                    quantity: 1
                  },
            dataType: 'json',
            success: function(html){
                $(this).html('Added');
            }
      });
    });

    $('a.remove-from-cart').click(function(){
        var item_id = $(this).attr('data-id');
        console.log('Item: ' + item_id);

        $.ajax({
            url: "/cart/remove/",
            type: "POST",
            cache: false,
            context : this,
            data: { item_id: item_id
                  },
            dataType: 'json',
            success: function(html){
                var subtotal = $(this).attr('data-subtotal');
                var total = parseInt($('#total').attr('data-total'),10);

                var new_total = total - subtotal;
                $('#total').attr('data-total', new_total);
                $('#total').html('$' + new_total);

                $(this).parents('.item-row').remove();
            }
      });
    });
});
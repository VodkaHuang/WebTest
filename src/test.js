window.onload = function() {
    //[結帳]
    $('#btn_canculate').on('click', function() { CalculatePriceAndShow(); });
    //[折扣]
    $('[name=rb_discount_list]').on('change', function() {
        CalculatePriceAndShow();
        //console.log('選擇的是[' + $(this).val() + ']');
    });
};


class CashContext {
    constructor(p_type) {
        switch (p_type) {
            case 'dc_20percent_off':
                this.cs = new CashRebate(0.8);
                break;
            default:
                this.cs = new CashNormal();
        }
    }
    GetResult(p_money) {
        return this.cs.acceptCash(p_money);
    }
};

class CashSuper {
    constructor() {}
    acceptCash(p_oriMoney) {}
};
class CashNormal extends CashSuper {
    constructor() {
        super();
    }
    acceptCash(p_oriMoney) { return p_oriMoney; }
}
class CashRebate extends CashSuper {
    constructor(p_moneyRebate) {
        super();
        this.moneyRebate = p_moneyRebate || 1; //預設無折扣
    }
    acceptCash(p_oriMoney) {
        return p_oriMoney * this.moneyRebate;
    }
}

var CalculatePriceAndShow = function() {
    let totalPrice = $('#i_price').val() * $('#i_amount').val();
    let discountStrategy = $('[name=rb_discount_list]').val();
    $('#lb_total').html((new CashContext(discountStrategy)).GetResult(totalPrice));
}
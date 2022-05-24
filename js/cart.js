window.addEventListener('DOMContentLoaded', (event) => {
	const productsBtn = document.querySelectorAll('.product__btn');
	const cartProductsList = document.querySelector('.cart-content__list');
	const cart = document.querySelector('.cart');
	const cartQuantity = document.querySelector('.cart__quantity');
	const fullPrice = document.querySelector('.fullprice');
    const orderModalList = document.querySelector('.order-modal__list');
	let randomId = 0;
	let price = 0;
	let productArray = [];

    
	
	
	
	const priceWithoutSpaces = (str) => {
		return str.replace();
	};
	
    
	// Рабочий код
	const normalPrice = (str) => { 
		 return String(str).replace();
	};

	

	const plusFullPrice = (currentPrice) => {
		return price += currentPrice;
	};
	

	const minusFullPrice = (currentPrice) => {
		return price -= currentPrice;
	};
	
	const printQuantity = () => {
		let productsListLength = cartProductsList.querySelector('.simplebar-content').children.length;
		cartQuantity.textContent = productsListLength;
		productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
	};


	
	
	const printFullPrice = () => {
		fullPrice.textContent = `${normalPrice(price)} ₽`;
	};
    


    // создание товара в Корзине
	const generateCartProduct = (img, title, price, id, counter) => {
        

	
		return `
			<div class="cart-content__item">
				<article class="cart-content__product cart-product" data-id="${id}">
					<img src="${img}" alt="" class="cart-product__img">
					<div class="cart-product__text">
						<h3 class="cart-product__title">${title}</h3>
						<span class="cart-product__price">${price} </span>
						<span class="cart-product__counter-minus" data-action="minus"></span>
						<span class="cart-product__counter" data-counter>${counter}</span>
						<span class="cart-product__counter-plus" data-action="plus">л</span>
					</div>
					<button class="cart-product__delete" aria-label="Удалить товар"></button>
				</article>
			</div>
		`;
        

	};

    
   
	
	const deleteProducts = (productParent) => {
		 let id = productParent.querySelector('.cart-product').dataset.id;
		 document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
		
		let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent)) * parseInt(priceWithoutSpaces(productParent.querySelector('[data-counter').textContent));
		minusFullPrice(currentPrice);
		printFullPrice();
		productParent.remove();
	
		printQuantity();
	
		updateStorage();
	};
	
    

	 let counter = 0;
	  window.onload = productsBtn.forEach(el => {
		        el.closest('.product').setAttribute('data-id', randomId++);

			    el.addEventListener('click', (e) => {
				let self = e.currentTarget;
				let parent = self.closest('.product');
				let id = parent.dataset.id;
				let img = parent.querySelector('.image-switch__img img').getAttribute('src');
				let title = parent.querySelector('.product__title').textContent;
				counter = parent.querySelector('[data-counter]').textContent;
				let priceString = priceWithoutSpaces(parent.querySelector('.product-price__current').textContent);
				let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').textContent));
				let priceTotal = (parseInt(counter) * priceNumber);
	
				 
				
				plusFullPrice(priceTotal); //итого в Корзине 
		
				printFullPrice();
		       
				
			   cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id, counter));
				

				printQuantity();
		
		
				updateStorage();


				
	        	self.disabled = true;
				});

	  }); 

	
	cartProductsList.addEventListener('click', (e) => {
		if (e.target.classList.contains('cart-product__delete')) {
			deleteProducts(e.target.closest('.cart-content__item'));
		}
	});
	

  

	const modal = new GraphModal({
		isOpen: (modal) => {
			orderModalList.innerHTML = '';
			console.log('opened');
			let array = cartProductsList.querySelector('.simplebar-content').children;
			let fullprice = fullPrice.textContent;
			let length = array.length;
	
			document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
			document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;

	
			console.log(productArray)
		},
		isClose: () => {
			console.log('closed');
		}
	});
	
	
	document.querySelector('.order').addEventListener('submit', (e) => {
		e.preventDefault();
		let self = e.currentTarget;
	
		let formData = new FormData(self);
		let name = self.querySelector('[name="Имя"]').value;
		let tel = self.querySelector('[name="Телефон"]').value;
		let mail = self.querySelector('[name="Email"]').value;
		formData.append('Товары', JSON.stringify(productArray));
		formData.append('Имя', name);
		formData.append('Телефон', tel);
		formData.append('Email', mail);
	
		let xhr = new XMLHttpRequest();
	
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log('Отправлено');
				}
			}
		}
	
		xhr.open('POST', 'mail.php', true);
		xhr.send(formData);
	
		self.reset();
	});

	const countSumm = () => {
		document.querySelectorAll('.cart-content__item').forEach(el => {
			price += parseInt(priceWithoutSpaces(el.querySelector('.cart-product__price').textContent)) * parseInt(el.querySelector('[data-counter]').textContent);
		});


	};

    

	
	

	const initialState = () => {
		if (localStorage.getItem('products') !== null) {
		   cartProductsList.querySelector('.simplebar-content').innerHTML = localStorage.getItem('products');
		   printQuantity();
           countSumm();
		   printFullPrice();




		   document.querySelectorAll('.cart-content__product').forEach (el => {
			   let id = el.dataset.id;
			   document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = true;
		   });


	   }
    };
  
    initialState();

  
    const updateStorage = () => {
	   let parent = cartProductsList.querySelector('.simplebar-content');
	   let html = parent.innerHTML;
	   html = html.trim();

	  
     
	   if (html.length) {
		  localStorage.setItem('products', html);
	   } else {
		   localStorage.removeItem('products');
	   }
    };



	    window.addEventListener('click', function (event) {
        
        // Объявляем переменную для счетчика 
		let counter;
	    let productInfo;

		// Проверяем клик строго по кнопкам Плюс или Минус
        if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus' ) {
           // Находим обертку счетчика
		   const counterWrapper = event.target.closest('.items__wrapper');
		   // Находим див с числом 
		   counter = counterWrapper.querySelector('[data-counter]');
		}



		// Пробный счетчик
		const card = event.target.closest('.product');
		   if (card) {
			productInfo = {
				id: card.dataset.id,
				counter: card.querySelector('[data-counter]').innerText, 
		   }
		};
		
		


		//Проверяем был ли клик на Плюс
		if (event.target.dataset.action === 'plus') {
    


		  counter = ++counter.innerHTML ;

		     //Проверяем есть ли такой товар в корзине 
		      const itemInCart = cartProductsList.querySelector(`[data-id="${productInfo.id}"]`);
			  
        

		        // Если товар есть в корзине 
		        if (itemInCart) {
                   const counterElement = itemInCart.querySelector('[data-counter]');
		           counterElement.innerHTML = ++productInfo.counter;
				   
				   let priceNumberPlus = parseInt(itemInCart.querySelector('.cart-product__price').textContent);
				   plusFullPrice(priceNumberPlus); //итого в Корзине 
				   printFullPrice();
		        }
				
	    }
		
	    //Проверяем был ли клик на Минус
	    if (event.target.dataset.action === 'minus') {


 
		    if (parseInt(counter.innerHTML ) > 1 ) {
		    counter = --counter.innerHTML ;

			

		      //Проверяем есть ли такой товар в корзине 
	    	  const itemInCart = cartProductsList.querySelector(`[data-id="${productInfo.id}"]`);
            

		         // Если товар есть в корзине 
		         if (itemInCart) {
                   const counterElement = itemInCart.querySelector('[data-counter]');
		           counterElement.innerHTML = --productInfo.counter;
				  
				   let priceNumberMinus = parseInt(itemInCart.querySelector('.cart-product__price').textContent);
				   minusFullPrice(priceNumberMinus);
		           printFullPrice();
		         }
		   }  
	    }
	    }); 




	   

});

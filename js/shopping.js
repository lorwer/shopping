var xiaomi = {
	// 初始化方法
	start() {
		let flage = sessionStorage.getItem("flage");

		let J_userInfonone = document.getElementById('J_userInfonone');
		let J_userInfo = document.getElementById('J_userInfo');
		let J_span = document.getElementById('J_span');
		let J_cartListGoods = document.getElementById('J_cartListGoods');
		let J_cartEmpty = document.getElementById('J_cartEmpty');
		let J_loginBtn = document.getElementById('J_loginBtn');
		let J_Shoping = document.getElementById('J_Shoping');

		// 判断是否登录
		if (flage == 'true') {
			J_userInfonone.style.display = 'none';
			J_userInfo.style.display = 'block';
			let idaccunt = sessionStorage.getItem("idaccunt");
			document.getElementsByClassName('name')[0].innerHTML = idaccunt;
			J_span.innerHTML = '买购物车中商品的人还买了';
			J_cartEmpty.classList.add('hide');
			J_cartListGoods.style.display = 'block';
			J_loginBtn.style.display = 'none';
			J_Shoping.style.display = 'block';
			this.ajaxFun();
			this.cartBar();
		} else {
			J_userInfonone.style.display = 'block';
			J_userInfo.style.display = 'none';
			J_span.innerHTML = '为您推荐';
			J_cartEmpty.classList.remove('hide');
			J_cartListGoods.style.display = 'none';
			J_loginBtn.style.display = 'block';
			J_Shoping.style.display = 'none';
		}
		// 退出
		let J_userLogout = document.getElementById('J_userLogout');
		J_userLogout.onclick = function() {
			sessionStorage.setItem("flage", 'false');
			xiaomi.start();
		}
	},

	// 数据请求
	ajaxFun() {
		let test;
		// 第一步:获取XMLHttpRequest对象
		if (window.XMLHttpRequest) {
			test = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			// 兼容IE低版本浏览器
			test = new window.ActiveXObject();
		} else {
			alert('请升级至最新版本的浏览器');
		}

		if (test != null) {
			// 第三步:open连接
			test.open('GET', 'https://lorw.cn/api/getShoppingApi.php', true);
			// 第四步:send请求
			test.send(null);

			// 第二步:设置状态监听事件
			test.onreadystatechange = function() {
				// 第五步:判断ajax.readyState == 4 && ajax.status == 200 表示请求成功
				if (test.readyState == 4 && test.status == 200) {
					// 第六步:接受反馈:使用JSON.parse()来取得里面的数据
					let obj = JSON.parse(test.responseText);
					// obj = false;
					if (obj) {
						let str = '',
							index = [],
							proc = [];
						for (var key in obj) {
							str +=
								`<div class="list-body myclear" data-checked = "false">
								<div class="col col-check"><i class="iconfont icon-checkbox J_select">√</i></div>
								<div class="col col-img"><a href="javascript:;"><img src="${obj[key].img}" alt=""></a></div>
								<div class="col col-name">${obj[key].name}</div>
								<div class="col col-price">${obj[key].proc}元</div>
								<div class="col col-num">
									<div class="change-goods-num myclear J_changeGoodsNum">
										<a href="javascript:void(0)" class="J_minus"><i class="iconfont">-</i></a>
										<input tyep="text" value="${obj[key].number}" class="goods-num J_goodsNum">
										<a href="javascript:void(0)" class="J_plus"><i class="iconfont">+</i></a>
									</div>
								</div>
								<div class="col col-total">${obj[key].proc * obj[key].number}元</div>
								<div class="col col-action">×</div>
							</div>`;
							index.push(obj[key].xz);
							proc.push(obj[key].proc);
						}
						document.getElementById('wapper').innerHTML = str;
						xiaomi.updata(index, proc);
					} else {
						document.getElementById('J_cartEmpty').classList.remove('hide');
						document.getElementById('J_cartListGoods').style.display = 'none';
					}
				}
			}
		}
	},

	// 操作数据
	updata(index, proc) {
		// 减加
		let J_minus = document.getElementsByClassName('J_minus');
		let J_plus = document.getElementsByClassName('J_plus');
		// 数量
		let J_goodsNum = document.getElementsByClassName('J_goodsNum');
		// 小计
		let colTotal = document.getElementsByClassName('col-total');
		// 合计
		let J_cartTotalPrice = document.getElementById('J_cartTotalPrice');
		let colAction = document.getElementsByClassName('col-action');
		// 选项框
		let J_selectAll = document.getElementById('J_selectAll');
		let check = document.getElementsByClassName('J_select');

		let J_noSelectTip = document.getElementById('J_noSelectTip');
		let J_goCheckout = document.getElementById('J_goCheckout');

		// 加/减
		for (let i = 0; i < J_plus.length; i++) {
			J_plus[i].onclick = function() {
				if (J_goodsNum[i].value < index[i]) {
					J_goodsNum[i].value++;
					colTotal[i + 1].innerHTML = proc[i] * J_goodsNum[i].value + '元';
					sum();
				} else {
					alert("您购买的商品超过了限制的数量");
				}
			}
			J_minus[i].onclick = function() {
				if (J_goodsNum[i].value > 1) {
					J_goodsNum[i].value--;
					colTotal[i + 1].innerHTML = proc[i] * J_goodsNum[i].value + '元';
					sum();
				} else {
					alert("您购买的商品数量不能在低了哦");
				}
			}
		}

		// 求和
		function sum() {
			if (isSelectAll()) {
				J_noSelectTip.style.display = 'none';
				J_goCheckout.classList.remove('btn-disabled');
			} else {
				J_noSelectTip.style.display = 'block';
				J_goCheckout.classList.add('btn-disabled');
			}
			let colTotal = document.getElementsByClassName('col-total');
			let total = 0;
			for (let i = 1, len = check.length; i < len; i++) {
				if (check[i].parentNode.parentNode.dataset.checked == 'true') {
					total += parseFloat(colTotal[i].innerText);
				}
			}
			J_cartTotalPrice.innerText = total;
			Select();
		}

		// 删除
		for (let i = 1, len = colAction.length; i < len; i++) {
			colAction[i].onclick = function() {
				if (confirm('是否删除')) {
					this.parentElement.remove();
					check.length--;
					document.getElementById('J_cartTotalNum').innerHTML = check.length - 1;
					sum();
				}
			}
		}

		// 单个选中
		for (let i = 1, len = check.length; i < len; i++) {
			check[i].onclick = function() {
				if (this.parentNode.parentNode.dataset.checked == 'false') {
					this.parentNode.parentNode.dataset.checked = 'true';
					this.style.color = '#000';
				} else {
					this.parentNode.parentNode.dataset.checked = 'false';
					this.style.color = '#fff';

				}
				if (isSelect()) {
					J_selectAll.parentNode.parentNode.dataset.checked = 'false';
					J_selectAll.style.color = '#fff';
				} else {
					J_selectAll.parentNode.parentNode.dataset.checked = 'true';
					J_selectAll.style.color = '#000';
				}
				sum();
			}
		}

		// 全选
		J_selectAll.onclick = function() {
			if (this.parentNode.parentNode.dataset.checked == 'false') {
				for (let i = 0, len = check.length; i < len; i++) {
					check[i].parentNode.parentNode.dataset.checked = 'true';
					check[i].style.color = '#000';
				}
			} else {
				for (let i = 0, len = check.length; i < len; i++) {
					check[i].parentNode.parentNode.dataset.checked = 'false';
					check[i].style.color = '#fff';
				}
			}
			sum();
		}

		// 商品件数
		document.getElementById('J_cartTotalNum').innerHTML = check.length - 1;
		// 选中个数
		function Select() {
			var index = 0;
			for (let i = 1; i < check.length; i++) {
				if (check[i].parentNode.parentNode.dataset.checked == 'true') {
					index++;
				}
			}
			document.getElementById('J_selTotalNum').innerHTML = index;
		}

		// 判断只要有一个选中返回true
		function isSelectAll() {
			for (let i = 0, len = check.length; i < len; i++) {
				if (check[i].parentNode.parentNode.dataset.checked == 'true') {
					return true;
				}
			}
			return false;
		}

		// 判断只要有一个没有选中返回true
		function isSelect() {
			for (let i = 1, len = check.length; i < len; i++) {
				if (check[i].parentNode.parentNode.dataset.checked == 'false') {
					return true;
				}
			}
			return false;
		}
	},

	// 结算条
	cartBar() {
		let recommendTitle = document.getElementsByClassName('xm-recommend-title')[0].getBoundingClientRect().top;
		let cartbar = document.getElementsByClassName('cart-bar')[0];
		if (recommendTitle - 400 < 0) {
			cartbar.classList.remove('cart-bar-fixed');
			cartbar.style.position = 'relative';
		} else {
			cartbar.classList.add('cart-bar-fixed');
			cartbar.style.position = '';
		}
	}
}

// 加载事件
window.onload = function() {
	xiaomi.start();
}

// 监听scroll事件
window.addEventListener('scroll', xiaomi.cartBar);

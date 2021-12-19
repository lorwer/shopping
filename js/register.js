var xiaomi = {
	id: "+86",
	// 初始化方法
	start() {
		this.select();
		this.register();
		this.regboxthree();
		this.login();
	},

	// 下拉方法
	select() {
		let tits = document.getElementById('tits');
		let titsLis = tits.nextElementSibling.getElementsByClassName('record');
		let titsText = tits.getElementsByTagName('p')[0];

		let phoneCty = document.getElementById('reg-phone-select-cty');
		let phoneCtyLis = phoneCty.nextElementSibling.getElementsByClassName('record');
		let phoneCtyText = phoneCty.getElementsByTagName('p')[0];
		// 地名
		tits.onclick = function() {
			if(tits.nextElementSibling.style.display == 'block') {
				tits.nextElementSibling.style.display = 'none';
			} else {
				tits.nextElementSibling.style.display = 'block';
			}
		}
		for (let i = 0; i < titsLis.length; i++) {
			titsLis[i].onclick = function() {
				titsText.innerHTML = titsLis[i].getElementsByTagName('span')[0].innerHTML;
				phoneCtyText.innerHTML = phoneCtyLis[i].getElementsByTagName('span')[1].innerHTML;
				this.id = phoneCtyText.innerHTML;
				tits.nextElementSibling.style.display = 'none';
			}.bind(this)
		}
		// 编号
		phoneCty.onclick = function() {
			phoneCty.nextElementSibling.style.display = 'block';
		}
		for (let i = 0; i < phoneCtyLis.length; i++) {
			phoneCtyLis[i].onclick = function() {
				phoneCtyText.innerHTML = phoneCtyLis[i].getElementsByTagName('span')[1].innerHTML;
				phoneCty.nextElementSibling.style.display = 'none';
			}
		}
	},

	// 立即注册
	register() {
		let btn = document.getElementById('btn');
		let errer = document.getElementsByClassName('err_tip')[0];
		let text = document.getElementById('text');

		btn.onclick = function() {
			if (text.value) {
				if (/^1[3-9]\d{9}$/.test(text.value)) {
					sessionStorage.setItem("phone", text.value);
					sessionStorage.setItem("id", this.id)
					document.getElementsByClassName('regbox')[0].style.display = 'none';
					document.getElementsByClassName('regboxTwo')[0].style.display = 'block';
					this.verification();
				} else {
					errer.style.display = 'block';
					errer.getElementsByTagName('span')[0].innerHTML = '手机号码格式不正确';
				}
			} else {
				errer.style.display = 'block';
				errer.getElementsByTagName('span')[0].innerHTML = '请输入手机号码';
			}
		}.bind(this)
		text.onclick = function() {
			errer.style.display = 'none';
		}
	},

	// 验证码验证
	verification() {
		let phone = sessionStorage.getItem("phone");
		let id = sessionStorage.getItem("id");
		// 设置电话号码
		document.getElementsByClassName('address-place')[0].innerHTML = id + " " + phone;

		let errer = document.getElementsByClassName('err_tip')[1];
		let err = errer.getElementsByTagName('span')[0];
		let resendcode = document.getElementsByClassName('resendcode')[0];
		let sendStatus = document.getElementsByClassName('send-status')[0];
		let btn = document.getElementsByClassName('remain')[0];
		let submitStep = document.getElementsByClassName('submit-step')[1];
		let changeView = document.getElementsByClassName('change-view')[0];

		// 设置生成验证码倒计时
		let index = 1;
		sendStatus.innerHTML = "重新发送(60)";

		function timer() {
			let time = 60 * index;
			btn.disabled = 'disabled';
			let timeSet = setInterval(function() {
				time--;
				sendStatus.innerHTML = "重新发送(" + time + ")";
				if (time == 0) {
					clearInterval(timeSet);
					sendStatus.innerHTML = "重新发送";
					btn.disabled = false;
				}
			}, 1000);
		}
		timer();

		btn.onclick = function() {
			index++;
			timer();
		}

		// 随机生成四位数
		function numBer() {
			let num = '';
			for (let i = 0; i < 4; i++) {
				num += (Math.random() * 10) | 0;
			}
			console.log(num);
			return num;
		}
		let num = numBer();

		// 下一步
		submitStep.onclick = function() {
			if (resendcode.value) {
				if (resendcode.value == num) {
					document.getElementsByClassName('regboxTwo')[0].style.display = 'none';
					document.getElementsByClassName('regboxthree')[0].style.display = 'block';
					xiaomi.regboxthree();
				} else {
					errer.style.display = 'block';
					err.innerHTML = '验证码错误或已过期';
				}
			} else {
				errer.style.display = 'block';
				err.innerHTML = '请输入短信验证码';
			}
		}

		// 返回
		changeView.onclick = function() {
			document.getElementsByClassName('regbox')[0].style.display = 'block';
			document.getElementsByClassName('regboxTwo')[0].style.display = 'none';
		}
	},

	// 设置密码
	regboxthree() {
		let phone = sessionStorage.getItem("phone");
		document.getElementsByClassName('address-place')[1].innerHTML = phone;

		let errer1 = document.getElementsByClassName('err_tip')[2];
		let errer2 = document.getElementsByClassName('err_tip')[3];
		let err1 = errer1.getElementsByTagName('span')[0];
		let err2 = errer2.getElementsByTagName('span')[0];
		let resendcode1 = document.getElementsByClassName('resendcode')[1];
		let resendcode2 = document.getElementsByClassName('resendcode')[2];
		let btn = document.getElementsByClassName('submit-step')[2];

		let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![^(0-9a-zA-Z)]+$).{8,16}$/;

		btn.onclick = function() {
			if (resendcode1.value) {
				if (reg.test(resendcode1.value)) {
					if (resendcode2.value) {
						if (resendcode1.value == resendcode2.value) {
							sessionStorage.setItem("pwd", resendcode1.value);
							document.getElementsByClassName('regboxthree')[0].style.display = 'none';
							document.getElementsByClassName('regbox-accunt')[0].style.display = 'block';
							xiaomi.login();
						} else {
							errer2.style.display = 'block';
							err2.innerHTML = '两次密码不一样';
						}
					} else {
						errer2.style.display = 'block';
						err2.innerHTML = '请再输入一次密码';
					}
				} else {
					errer1.style.display = 'block';
					err1.innerHTML = '密码格式不对';
				}
			} else {
				errer1.style.display = 'block';
				err1.innerHTML = '请输入密码';
			}
		}

		resendcode1.onclick = function() {
			errer1.style.display = 'none';
			errer2.style.display = 'none';
		}
		resendcode2.onclick = function() {
			errer1.style.display = 'none';
			errer2.style.display = 'none';
		}
	},

	// 登录
	login() {
		let btn = document.getElementsByClassName('submit-step')[3];
		let num = "226";
		for (let i = 0; i < 7; i++) {
			num += (Math.random() * 10) | 0;
		}
		document.getElementsByClassName('address-place')[2].innerHTML = num;
		sessionStorage.setItem("idaccunt", num);

		btn.onclick = function() {
			window.location.href = 'login.html';
		}
	}
}
xiaomi.start();

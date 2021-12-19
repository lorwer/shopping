var xiaomi = {
	// 初始化方法
	start() {
		this.initializepd();
		this.header();
		this.sectionHeader();
		this.categoryList();
		// this.flashtime();
		// this.flashlist();
		this.pageMain();
		this.hiddenVideo();
	},
	initializepd() {
		let flage = sessionStorage.getItem("flage");
		let J_siteInfo = document.getElementById('J_siteInfo');
		let J_siteUserInfo = document.getElementById('J_siteUserInfo');
		// 判断是否登录
		if (flage == 'true') {
			J_siteInfo.style.display = 'none';
			J_siteUserInfo.style.display = 'block';
			let idaccunt = sessionStorage.getItem("idaccunt");
			document.getElementsByClassName('name')[0].innerHTML = idaccunt;
		} else {
			J_siteInfo.style.display = 'block';
			J_siteUserInfo.style.display = 'none';
		}

		// 退出
		let J_userLogout = document.getElementById('J_userLogout');
		J_userLogout.onclick = function() {
			sessionStorage.setItem("flage", 'false');
			J_siteInfo.style.display = 'block';
			J_siteUserInfo.style.display = 'none';
		}
	},

	// 头部方法
	header() {
		// 顶部导航栏下载app开始
		let J_siteDownloadApp = document.getElementById('J_siteDownloadApp');
		let appcode = J_siteDownloadApp.getElementsByClassName('appcode')[0];
		// 移入事件
		J_siteDownloadApp.onmousemove = function() {
			appcode.style.height = '148px';
		}
		// 移除事件
		J_siteDownloadApp.onmouseout = function() {
			appcode.style.height = '0';
		}
		// 顶部导航栏下载app结束

		// 顶部导航栏的购物车start
		let J_miniCartTrigger = document.getElementById('J_miniCartTrigger');
		let J_miniCartMenu = document.getElementById('J_miniCartMenu');
		// 移入事件
		J_miniCartTrigger.onmousemove = function() {
			J_miniCartMenu.style.height = '100px';
		}
		// 移除事件
		J_miniCartTrigger.onmouseout = function() {
			J_miniCartMenu.style.height = '0';
		}
		// 顶部导航栏的购物车end

		/* 头部导航栏start */
		let J_childrenList = document.getElementById('J_childrenList').getElementsByClassName('nav-item');
		for (let i = 0; i < J_childrenList.length - 2; i++) {
			J_childrenList[i].onmousemove = function() {
				J_childrenList[i].children[1].style.display = 'block';
			}
			J_childrenList[i].onmouseout = function() {
				J_childrenList[i].children[1].style.display = 'none';
			}
		}
		/* 头部导航栏end */

		// 搜索start
		let search = document.getElementById('search');
		let J_keywordList = document.getElementById('J_keywordList');
		let lis = J_keywordList.querySelectorAll('li');
		// 光标移入事件
		search.onfocus = function() {
			J_keywordList.style.display = 'block';
			search.style.borderColor = '#ff6700';
			search.nextElementSibling.style.borderColor = '#ff6700';
		}
		// 光标消失事件
		search.onblur = function() {
			J_keywordList.style.display = 'none';
			search.style.borderColor = '#eee';
			search.nextElementSibling.style.borderColor = '#eee';
		}
		// 搜索end
	},

	//主体部分的头部方法
	sectionHeader() {
		let J_homeSwiper = document.getElementById('J_homeSwiper');
		let swiperList = J_homeSwiper.getElementsByClassName('swiper-list')[0];
		let pagination = J_homeSwiper.getElementsByClassName('swiper-pagination')[0].querySelectorAll('li');
		let btnPrev = J_homeSwiper.getElementsByClassName('swiper-button-prev')[0];
		let btnNext = J_homeSwiper.getElementsByClassName('swiper-button-next')[0];
		let _index = 0;
		let _time = new Date(); //记录当前时间

		// 页面加载时开启自动播放
		var timer = setInterval(btnNextfn, 5000);
		// 鼠标移入时取消自动播放
		swiperList.onmouseover = function() {
			clearInterval(timer);
		}
		// 鼠标移除时开启自动播放
		swiperList.onmouseout = function() {
			timer = setInterval(btnNextfn, 5000);
		}

		// 分页按钮
		for (let i = 0; i < pagination.length; i++) {
			pagination[i].onclick = function() {
				swiperList.style.transform = "translateX(-" + i * 1226 + "px)";
				pagination[_index].className = '';
				_index = i;
				pagination[_index].className = 'active';
			}
		}

		// 下一张
		btnNext.onclick = btnNextfn;

		function btnNextfn() {
			if (new Date() - _time < 1000) {
				return; //两次点击小于1s，不做任何操作
			}
			_time = new Date();
			var i = _index;
			_index++;
			_index >= pagination.length && (_index = 0);
			swiperList.style.transform = "translateX(-" + _index * 1226 + "px)";
			pagination[i].className = '';
			pagination[_index].className = 'active';
		}

		// 上一张
		btnPrev.onclick = function() {
			if (new Date() - _time < 1000) {
				return; //两次点击小于1s，不做任何操作
			}
			_time = new Date();
			var i = _index;
			_index--;
			_index < 0 && (_index = pagination.length - 1);
			swiperList.style.transform = "translateX(-" + _index * 1226 + "px)";
			pagination[i].className = '';
			pagination[_index].className = 'active';
		}
	},

	//主体部分的头部方法的二级菜单
	categoryList() {
		let J_categoryList = document.getElementById('J_categoryList').getElementsByClassName('category-li');
		for (let i = 0; i < J_categoryList.length; i++) {
			J_categoryList[i].onmousemove = function() {
				this.getElementsByTagName('div')[0].style.display = 'block';
			}
			J_categoryList[i].onmouseout = function() {
				this.getElementsByTagName('div')[0].style.display = 'none';
			}
		}
	},

	// 小米闪购定时器
	flashtime() {
		let time = document.getElementById('round_sj');
		let hou = document.getElementById('hou');
		let minute = document.getElementById('minute');
		let second = document.getElementById('second');

		setInterval(function() {
			var newDate = new Date(); //获取系统当前时间
			var year = newDate.getFullYear(); //获取年份
			var month = newDate.getMonth() + 1; //系统月份是从0开始的
			var day = newDate.getDate(); //获取的是星期 星期天为0
			var hour = newDate.getHours(); //小时
			var min = newDate.getMinutes(); //分数
			var sec = newDate.getSeconds(); //秒

			if (hour % 2 != 0) {
				//小时奇变偶
				hour = hour - 1;
			}
			time.innerHTML = hour + ":00";

			//时间差=结束时间（时间场小时+2）-起始时间（系统当前时间）;
			var endtime = year + "-" + month + "-" + day + " " + (hour + 2) + ":00:00";
			var statetime = newDate;
			var bidtime = (new Date(endtime).getTime() - statetime.getTime()) / 1000;
			var bidmin = bidtime / 60;
			var bidhour = bidmin / 60;

			hou.innerHTML = "0" + Math.floor(bidhour);

			if (parseInt(bidmin % 60) < 10) {
				minute.innerHTML = "0" + parseInt(bidmin % 60);
			} else {
				minute.innerHTML = parseInt(bidmin % 60);
			}

			if (parseInt(bidtime % 60) < 10) {
				second.innerHTML = "0" + parseInt(bidtime % 60);
			} else {
				second.innerHTML = parseInt(bidtime % 60);
			}
		}, 1000);
	},

	// 小米闪购轮播
	flashlist() {
		const width = 993;
		let prev = document.getElementsByClassName('swiper-flashsale-prev')[0];
		let next = document.getElementsByClassName('swiper-flashsale-next')[0];
		let J_flashSaleList = document.getElementById('J_flashSaleList').children[0];
		let index = 0;
		// 页面加载时开启自动播放
		var timer = setInterval(btnNextfn, 5000);
		// 鼠标移入时取消自动播放
		J_flashSaleList.onmouseover = function() {
			clearInterval(timer);
		}
		// 鼠标移除时开启自动播放
		J_flashSaleList.onmouseout = function() {
			timer = setInterval(btnNextfn, 5000);
		}
		next.onclick = btnNextfn;

		function btnNextfn() {
			if (index != 3) {
				index++;
				J_flashSaleList.style.transform = 'translateX(-' + index * width + 'px)';
			}
		}
		prev.onclick = function() {
			if (index) {
				index--;
				J_flashSaleList.style.transform = 'translateX(-' + index * width + 'px)';
			}
		}
	},

	// 家电/智能/搭配/配件/周边
	pageMain() {
		// 家电0
		let J_household = document.getElementById('J_household').children;
		let household = document.getElementsByClassName('main-household')[0].getElementsByClassName('right');
		this.boxContent(J_household, household);
		
		// 家电1
		J_household = document.getElementsByClassName('tab-list')[1].children;
		household = document.getElementsByClassName('main-household')[1].getElementsByClassName('right');
		this.boxContent(J_household, household);

		// 家电2
		J_household = document.getElementsByClassName('tab-list')[2].children;
		household = document.getElementsByClassName('main-household')[2].getElementsByClassName('right');
		this.boxContent(J_household, household);

		// 家电3
		J_household = document.getElementsByClassName('tab-list')[3].children;
		household = document.getElementsByClassName('main-household')[3].getElementsByClassName('right');
		this.boxContent(J_household, household);

		// 家电4
		J_household = document.getElementsByClassName('tab-list')[4].children;
		household = document.getElementsByClassName('main-household')[4].getElementsByClassName('right');
		this.boxContent(J_household, household);

		// // 智能
		// let J_capacity = document.getElementById('J_capacity').children;
		// let capacity = document.getElementsByClassName('main-capacity')[0].getElementsByClassName('right');
		// this.boxContent(J_capacity, capacity);

		// // 搭配
		// let J_mach = document.getElementById('J_mach').children;
		// let mach = document.getElementsByClassName('main-mach')[0].getElementsByClassName('right');
		// this.boxContent(J_mach, mach);

		// // 配件
		// let J_accessories = document.getElementById('J_accessories').children;
		// let accessories = document.getElementsByClassName('main-accessories')[0].getElementsByClassName('right');
		// this.boxContent(J_accessories, accessories);

		// // 周边
		// let J_rim = document.getElementById('J_rim').children;
		// let rim = document.getElementsByClassName('main-rim')[0].getElementsByClassName('right');
		// this.boxContent(J_rim, rim);
	},

	// 家电/智能/搭配/配件/周边的共同方法
	boxContent(array, element) {
		let _index = 0;
		element[_index].style.display = 'block';
		for (let i = 0; i < array.length; i++) {
			array[i].onmousemove = function() {
				for (let j = 0; j < element.length; j++) {
					array[_index].className = '';
					element[_index].style.display = 'none';
				}
				_index = i;
				array[_index].className = 'tab-active';
				element[_index].style.display = 'block';
			}
		}
	},

	// 遮阴层视频
	hiddenVideo() {
		let videoList = document.getElementsByClassName('video-list')[0].querySelectorAll('li');
		// 遮阴层的事件
		for (let i = 0; i < videoList.length; i++) {
			videoList[i].onclick = function() {
				let video = document.getElementById('video' + i);
				let miPlayerVideo = document.getElementById('miPlayerVideo' + i);
				let btn = document.getElementsByClassName('mi-dialog__headerbtn')[i];
				let play = document.getElementsByClassName('mi-video-play-btn')[i];

				// 页面打开自动播放
				video.style.display = 'block';
				miPlayerVideo.play();

				// 关闭
				btn.onclick = function() {
					miPlayerVideo.pause();
					video.style.display = 'none';
				}

				// 暂停图片和视频的点击事件
				play.onclick = onplay;
				miPlayerVideo.onclick = onplay;

				// 暂停与播放
				function onplay() {
					// 判断是否播放
					if (miPlayerVideo.paused) {
						// 播放
						miPlayerVideo.play();
						play.style.display = 'none';
					} else {
						// 暂停
						miPlayerVideo.pause();
						play.style.display = 'block';
					}
					// 去掉controls属性
					miPlayerVideo.controls = false;
				}

				// 移入移除事件来设置视频的controls事件
				miPlayerVideo.onmousemove = function() {
					miPlayerVideo.controls = 'controls';
				}
				miPlayerVideo.onmouseout = function() {
					miPlayerVideo.controls = false;
				}
			}
		}
	},

	// 固定栏
	divHome() {
		let height = document.documentElement.scrollTop || document.body.scrollTop;
		let imgYincang = document.getElementsByClassName('img_yincang')[0];
		if (height > 0) {
			imgYincang.style.display = 'block';
		} else {
			imgYincang.style.display = 'none';
		}
	}
}

// 加载事件
window.onload = function() {
	xiaomi.start();
}
// 回到顶部
window.onscroll = xiaomi.divHome;

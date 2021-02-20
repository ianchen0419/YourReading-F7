var $$ = this.Dom7;

let categoryData=['周董推薦', '小說'];

let bookData=[
	{
		readStatus: '已閱讀',
		ISBN_13: '9784473043306',
		title: 'マボロシの茶道具図鑑',
		authors: ['依田徹'],
		publishedDate: '2019-10',
		startRead: '2020-01-01',
		endRead: '2020-02-02',
		category: ['周董推薦'],
		description: '失われている、あるいは、所蔵者不明の名品など、もう「見られない」=「マボロシ」の茶道具をイラストを交え、図鑑風に紹介します。',
		thumbnail: 'http://books.google.com/books/content?id=L9kbygEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'
	},
	{
		readStatus: '正在閱讀',
		ISBN_13: '9784041090152',
		title: '青くて痛くて脆い',
		authors: ['住野よる'],
		publishedDate: '2020-06',
		startRead: '2020-01-01',
		endRead: '',
		category: ['小說'],
		description: '『君の膵臓をたべたい』著者が放つ、青春小説!',
		thumbnail: 'http://books.google.com/books/content?id=MgSrzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'
	},
	{
		readStatus: '未閱讀',
		ISBN_13: '9784800295354',
		title: '泣ける!ミステリー 父と子の物語',
		authors: ['冲方丁','岡崎琢磨','里見蘭','小路幸也','友清哲'],
		publishedDate: '2019-06-20',
		startRead: '',
		endRead: '',
		category: ['周董推薦','小說'],
		description: '人気作家が描き出す、五者五様の「父」の姿―船乗りの父、詐欺師の父、大学教授の父、そして...。「親の心子知らず」というが、子どもの目には見えない父親の本当の姿。その謎が明らかになったとき、あなたはきっと涙なしではいられない。すべての親子に贈る、魅力的な謎と愛すべき父に出会えるとっておきの短編集!',
		thumbnail: 'http://books.google.com/books/content?id=3SzGxQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'
	},
];

function renderBookshelf(){
	var bookShelfHTML=bookData.map(item=>{
		return `
				<div class="col-33 skeleton-text skeleton-effect-fade">
					<a onclick="openDetailpopup(${item.ISBN_13})" class="book-item elevation-2 display-block margin-bottom skeleton-block" style="height: 100%">
						<img src="${item.thumbnail}" width="100%" onload="removeListSkeleton(this)" />
					</a>
				</div>
				`;
	}).join('');


	var otherCol='';
	if(bookData.length%3==1){
		otherCol='<div class="col-33"></div>';
	}else if(bookData.length%3==2){
		otherCol='<div class="col-33"></div><div class="col-33"></div>';
	}

	bookShelfHTML+=otherCol;

	bookShelf.innerHTML=bookShelfHTML;
}

function renderList(el, readstatus){
	var getFilteredbook=bookData.filter(item=>item.readStatus==readstatus);
	//TODO: 已閱讀要比大小
	var bookListHTML=getFilteredbook.map(item=>{
		var swiperoutHTML='';
		if(item.readStatus=='正在閱讀'){
			swiperoutHTML=`<div class="swipeout-actions-right">
					<a href="#" class="swipeout-delete" onclick="markItReaded(${item.ISBN_13})">完成閱讀</a>
				</div>`;
		}else if(item.readStatus=='未閱讀'){
			swiperoutHTML=`<div class="swipeout-actions-right">
					<a href="#" class="swipeout-delete" onclick="markItReading(${item.ISBN_13})">開始閱讀</a>
				</div>`;
		}
		return `<li class="skeleton-text skeleton-effect-fade swipeout">
					<div class="item-content swipeout-content">
						<div class="item-media">
							<div class="skeleton-block" style="width: 40px;height: 58px">
								<img src="${item.thumbnail}" width="40" onload="removeListSkeleton(this)" />
							</div>
						</div>
						<div class="item-inner">
							<div class="item-title-row">
								<div class="item-title">${item.title}</div>
							</div>
							<div class="item-subtitle">${item.authors.join('、')}</div>
						</div>
					</div>
					${swiperoutHTML}
				</li>`;
		}).join('');
	$$(el).html(bookListHTML);
}

function findIndex(ISBN_13){
	var theIndex;
	bookData.forEach((item, index)=>{
		if(item.ISBN_13==ISBN_13){
			theIndex=index;
		}
	});
	return theIndex;
}

function markItReading(ISBN_13){
	var theIndex=findIndex(ISBN_13);
	bookData[theIndex].readStatus='正在閱讀';
	bookData[theIndex].startRead=new Date().toLocaleDateString('sv-SE');
	renderList('#readinglist', '正在閱讀');
	app.toast.create({
		text: `「${bookData[theIndex].title}」開始閱讀`,
		closeTimeout: 2000,
		position: 'top',
	}).open();
}

function markItReaded(ISBN_13){
	var theIndex=findIndex(ISBN_13);
	bookData[theIndex].readStatus='已閱讀';
	bookData[theIndex].endRead=new Date().toLocaleDateString('sv-SE');
	renderList('#readedlist', '已閱讀');
	app.toast.create({
		text: `「${bookData[theIndex].title}」完成閱讀`,
		closeTimeout: 2000,
		position: 'top',
	}).open();
}


function removeListSkeleton(ths){
	$$(ths).closest('.skeleton-text').removeClass('skeleton-text');
	$$(ths).closest('.skeleton-effect-fade').removeClass('skeleton-effect-fade');
}

function openDetailpopup(ISBN_13){
	var getThisBook=bookData.filter(item=>item.ISBN_13==ISBN_13)[0];
	var mypop=app.popup.create({
		content: 
		`<div class="popup my-popup">
			<div class="view">
				<div class="page">
					<div class="navbar">
						<div class="navbar-bg"></div>
						<div class="navbar-inner">
							<div class="title">書目資訊</div>
							<div class="right">
								<a class="link popup-close">關閉</a>
							</div>
						</div>
					</div>
					<div class="page-content">
						<div class="card">
							<div style="height: 40vh;overflow: hidden" valign="top" class="card-header no-padding skeleton-block skeleton-effect-fade">
								<img src="${getThisBook.thumbnail}" width="100%" onload="removeListSkeleton(this)">
							</div>
							<div class="data-table">
								<table>
									<tbody>
										<tr>
											<th width="130">書名</th>
											<td>${getThisBook.title}</td>
										</tr>
										<tr>
											<th>ISBN</th>
											<td>${getThisBook.ISBN_13}</td>
										</tr>
										<tr>
											<th>作者</th>
											<td>${getThisBook.authors.join('、')}</td>
										</tr>
										<tr>
											<th>所屬書單</th>
											<td>${getThisBook.category.join('、')}</td>
										</tr>
										<tr>
											<th>出版日期</th>
											<td>${getThisBook.publishedDate}</td>
										</tr>
										<tr>
											<th>狀態</th>
											<td>${getThisBook.readStatus}</td>
										</tr>
										<tr>
											<th>閱讀開始日</th>
											<td>${getThisBook.startRead}</td>
										</tr>
										<tr>
											<th>閱讀結束日</th>
											<td>${getThisBook.endRead}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="block block-strong padding-vertical-half">
							<p class="row">
								<button class="col button button-large color-red" onclick="app.dialog.confirm('確定刪除這本書嗎', '提示', ()=>{deleteBook(${getThisBook.ISBN_13}, '${getThisBook.title}')}, null)">刪除</button>
								<button class="col button button-large" onclick="shareBook(${getThisBook.ISBN_13}, '${getThisBook.title}')">分享</button>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>`
	});
	mypop.open();
}

function shareBook(ISBN, title){
	//Rick: NFC寫入完成後再噴toast
	window.setTimeout(function(){
		app.toast.create({
			text: `成功分享書目「${title}」`,
			closeTimeout: 2000,
			position: 'top',
		}).open();
	},1000);
}


function addBook(ISBN){
	var bookDataISBNArray=bookData.map(item=>item.ISBN_13);
	if(bookDataISBNArray.indexOf(ISBN)!==-1){
		app.dialog.alert('書單名稱不可重複', '提示').open();
	}else{
		app.request.json(
			'https://www.googleapis.com/books/v1/volumes', 
			{
				q: `isbn:${ISBN}`
			},
			function(data){
				var newBookData=data.items[0].volumeInfo;
				var newBookItem={
					readStatus: '未閱讀',
					ISBN_13: ISBN,
					title: newBookData.title,
					authors: newBookData.authors,
					publishedDate: newBookData.publishedDate,
					startRead: '',
					endRead: '',
					category: [],
					description: newBookData.description,
					thumbnail: newBookData.imageLinks.smallThumbnail
				};
				bookData.push(newBookItem);
				renderList('#notreadlist', '未閱讀');
				renderBookshelf();
				app.toast.create({
					text: `成功新增書目「${newBookData.title}」`,
					closeTimeout: 2000,
					position: 'top',
				}).open();
			}
		);
	}
}

function deleteBook(ISBN, title){
	bookData.splice(findIndex(ISBN),1);
	renderList('#readedlist', '已閱讀');
	renderList('#readinglist', '正在閱讀');
	renderList('#notreadlist', '未閱讀');
	renderBookshelf();
	app.popup.close($$('.my-popup'));
	app.toast.create({
		text: `已刪除書目「${title}」`,
		closeTimeout: 2000,
		position: 'top',
	}).open();
}

function addList(listName){
	var checkRepeat=categoryData.find(item=>item==listName);
	if(!checkRepeat){
		categoryData.push(listName);
		app.toast.create({
			text: `成功建立書單「${listName}」`,
			closeTimeout: 2000,
			position: 'top',
		}).open();
		renderCategoryTab();
	}else{
		app.dialog.alert('書單名稱不可重複', '提示').open();
	}
	
}

function addButtonClick(){
	app.actions.create({
		buttons: [
			[
				{
					text: '新增書目',
					onClick: function(){
						app.dialog.prompt('請輸入ISBN號碼', '新增書目', value=>addBook(value), '', '9784167908454');
					}
				},
				{
					text: '建立書單',
					onClick: function(){
						app.dialog.prompt('請輸入書單名稱', '建立書單', value=>addList(value), '', 'App學習');
					}
				}
			],
			[
				{
					text: '取消',
					color: 'red'
				}
			]
		]
	}).open();
}

function renderCategoryTab(){
	var categoryTabHTML=categoryData.map(item=>{
		return `
			<li>
				<a href="#" onclick="openCategoryListpopup('${item}')">${item}</a>
			</li>`;
	}).join('');
	$$('#categoryTab').html(categoryTabHTML);
}

function openCategoryListpopup(categoryName){
	var getCategoryListData=bookData.filter(item=>item.category.indexOf(categoryName) > -1);
	var categoryListHTML=getCategoryListData.map(item=>
		`<li class="swipeout">
			<div class="swipeout-content">${item.title}</div>
			<div class="swipeout-actions-right">
				<a href="#" class="swipeout-delete" onclick="removeCategory(${item.ISBN_13}, '${categoryName}')">移出書單</a>
			</div>
		</li>`
		).join('');
	var mypop=app.popup.create({
		content: 
		`<div class="popup my-popup">
			<div class="view">
				<div class="page">
					<div class="navbar">
						<div class="navbar-bg"></div>
						<div class="navbar-inner">
							<div class="title">${categoryName}</div>
							<div class="right">
								<a class="link popup-close">關閉</a>
							</div>
						</div>
					</div>
					<div class="page-content">
						<div class="list simple-list">
							<ul id="categoryViewList">${categoryListHTML}</ul>
						</div>
						<div class="list">
							<ul>
								<li>
									<a href="#" class="list-button color-red" onclick="app.dialog.confirm('確定刪除「${categoryName}」書單嗎', '提示', ()=>{deleteBookList('${categoryName}')}, null)">刪除這個書單</a>
								</li>
							</ul>
						</div>
						<div class="fab fab-extended fab-center-bottom">
							<a href="#" onclick="openAddBookListpop('${categoryName}')">
								<i class="icon f7-icons">plus</i>
								<div class="fab-text">添加書目</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>`
	});
	mypop.open();
}

function deleteBookList(category){
	bookData.forEach(item=>item.category=item.category.filter(cate=>cate!=category));
	categoryData.splice(category,1);
	renderCategoryTab();
	app.popup.close($$('.my-popup'));
	app.toast.create({
		text: `已刪除「${category}」書單`,
		closeTimeout: 2000,
		position: 'top',
	}).open();
}

function openAddBookListpop(categoryName){
	var getCategoryListData=bookData.filter(item=> item.category.indexOf(categoryName) == -1);
	var categoryListHTML=getCategoryListData.map(item=>
		`<li>
			<label class="item-checkbox item-content">
				<input type="checkbox" name="checkList" value="${findIndex(item.ISBN_13)}">
				<i class="icon icon-checkbox"></i>
				<div class="item-inner">
					<div class="item-title">${item.title}</div>
				</div>
			</label>
		</li>`).join('');
	var mypop=app.popup.create({
		content: 
			`<div class="popup my-popup">
				<div class="view">
					<div class="page">
						<div class="navbar">
							<div class="navbar-bg"></div>
							<div class="navbar-inner">
								<div class="title">添加書目</div>
								<div class="right">
									<a class="link popup-close" onclick="addBooktoCategory('${categoryName}', app.form.convertToData('#my-form').checkList)">確認</a>
								</div>
							</div>
						</div>
						<div class="page-content">
							<form class="list" id="my-form">
								<ul>${categoryListHTML}</ul>
							</form>
						</div>
					</div>
				</div>
			</div>`
	});
	mypop.open();
}


function removeCategory(ISBN_13,categoryName){
	var theIndex=findIndex(ISBN_13);
	bookData[theIndex].category=bookData[theIndex].category.filter(item=>item!==categoryName);
}

function addBooktoCategory(categoryName, Array){
	Array.forEach(item=>{
		bookData[item].category.push(categoryName);
		var newHTML=
			`<li class="swipeout">
				<div class="swipeout-content">${bookData[item].title}</div>
				<div class="swipeout-actions-right">
					<a href="#" class="swipeout-delete" onclick="removeCategory(${bookData[item].ISBN_13}, '123')">移出書單</a>
				</div>
			</li>`;
		$$('#categoryViewList').append(newHTML);
	});
}
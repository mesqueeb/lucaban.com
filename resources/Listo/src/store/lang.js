export default {	
	'en':
	{
		'global'://
		{
			'sec':'sec',
			'min':'min',
			'hour':'hour',
			'm':'m',
			'h':'h',
			's':'s',
			'cancel':'Cancel',
			'delete':'Delete',
			'save':'Save',
			'reload':'Reload',
		},
		'user'://
		{
			'login':'Login',
			'logout':'Logout',
			'register':'Register',
			'email':'Email Address',
			'password':'Password',
			'name':'Name',
		},
		'menu'://
		{
			'all':'All',
			'today':'Today',
			'journal':'Journal',
			'?':'?',
			'usedTime':'Used time',
			'timeLeft':'Time left',
			'items':'Items',
			'done':'Done',
			'total':'Total',
		},
		'card'://
		{
			'duration':'Duration:',
			'addTag':'Add tag:',
			'edit':'Edit',
			'copy':'Copy',
			'setToday':'Do today',
			'addAndContinue':'Add and continue',
			'addAndClose':'Add and close',
		},
		'tags':
		{
			'done':'Done',
			'today':'Today',
		},
		'popouts'://
		{
			'reset':'Reset',
			'ok':'Ok',
			'reallyDelete':'Really delete',
			'andAllChildren':'And all children',
			'overtime':'overtime',
			'total':'Total',
		},		
		'popups'://
		{
			'journalNotes':'Journal notes',
			'journalNotesPopover':'Edit journal notes',
			'completed':'Completed',
			'completedB':'',
			'usedTime':'Used time',
			'reset':'Reset',
			'setNotDone':'Undo completion',
		},
		'guide'://
		{
			'action':'Action',
			'key':'Key',
			'keybindings': [//
				{'key':'T','note':'Do <u>T</u>oday'},
				{'key':'S','note':'<u>S</u>topwatch / Timer'},
				{'key':'tab','note':'Indent item'},
				{'key':'enter','note':'Add item'},
				{'key':'cmd/ctrl + enter','note':'Edit item'},
				{'key':'shift + T','note':'Edit tags'},
				{'key':'alt + click on tag','note':'Hide tag'},
				{'key':'cmd/ctrl + ↑↓','note':'Move item up/down'},
				{'key':'ctrl + shift + D','note':'Duplicate item'},
			],
			'hints': {//
				'addItemHint':'Add some items!',
			},
		},
		'flashes'://
		{
			'moveTopLvlItem':'You cannot move this item when there is a filter.',
			'cannotDoThisInJournal':'You cannot do this in the Journal.',
			'ajaxError':'Error with connection. Reloading in ',
		},
	},
	'ja':
	{
		'global'://
		{
			'sec':'秒',
			'min':'分',
			'hour':'時',
			'm':'分',
			'h':'時',
			's':'秒',
			'cancel':'キャンセル',
			'delete':'削除',
			'save':'保存',
			'reload':'再読込',
		},
		'user'://
		{
			'login':'ログイン',
			'logout':'ログアウト',
			'register':'登録',
			'email':'メールアドレス',
			'password':'パスワード',
			'name':'名前',
		},
		'menu'://
		{
			'all':'全て',
			'today':'今日',
			'journal':'日報',
			'?':'？',
			'usedTime':'使用時間',
			'timeLeft':'残時間',
			'items':'アイテム',
			'done':'完了',
			'total':'合計',
		},
		'card'://
		{
			'duration':'使用時間:',
			'addTag':'タグを追加:',
			'edit':'編集',
			'copy':'コピー',
			'setToday':'今日やる',
			'addAndContinue':'複数追加',
			'addAndClose':'追加して閉じる',
		},
		'tags':
		{
			'done':'完了',
			'today':'今日',
		},
		'popouts'://
		{
			'reset':'リセット',
			'ok':'Ok',
			'reallyDelete':'本当に削除しますか？',
			'andAllChildren':'とその中の全てのアイテム',
			'overtime':'オーバータイム',
			'total':'合計',
		},		
		'popups'://
		{
			'journalNotes':'日報メモ',
			'journalNotesPopover':'日報メモを編集',
			'completed':'',
			'completedB':'を完了致しました',
			'usedTime':'使用時間',
			'reset':'リセット',
			'setNotDone':'完了取り消し',
		},
		'guide'://
		{
			'action':'アクション',
			'key':'ショートカットキー',
			'keybindings': [
				{'key':'T','note':'今日のタスクとして設定'},
				{'key':'S','note':'ストップウォッチ / タイマー'},
				{'key':'tab','note':'アイテムを右へ'},
				{'key':'enter','note':'アイテムを追加'},
				{'key':'cmd/ctrl + enter','note':'アイテムを編集'},
				{'key':'shift + T','note':'タグを編集'},
				{'key':'alt + click on tag','note':'タグのアイテムを非表示'},
				{'key':'cmd/ctrl + ↑↓','note':'アイテムを上下へ移動'},
				{'key':'ctrl + shift + D','note':'アイテムを複製'},
			],
			'hints': {
				'addItemHint':'アイテムを追加しよう！',
			},
		},
		'flashes'://
		{
			'moveTopLvlItem':'フィルタをかけた際、このアイテムは動かせません。',
			'cannotDoThisInJournal':'日報では機能しません。',
			'ajaxError':'接続エラー。再読込まで ',
		},
	},
};
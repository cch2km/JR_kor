/*
	jquery.flatheights.js
	Version: 2007-08-01
*/

/*
======================================================================
	$.changeLetterSize.addHandler(func)
	�����̑傫�����ω��������Ɏ��s���鏈����ǉ�
======================================================================
*/

jQuery.changeLetterSize = {
	handlers : [],
	interval : 1000,
	currentSize: 0
};

(function($) {

	var self = $.changeLetterSize;

	/* �����̑傫�����m�F���邽�߂�ins�v�f */
	var ins = $('<ins>M</ins>').css({
		display: 'block',
		visibility: 'hidden',
		position: 'absolute',
		padding: '0',
		top: '0'
	});

	/* �����̑傫�����ς������ */
	var isChanged = function() {
		ins.appendTo('body');
		var size = ins[0].offsetHeight;
		ins.remove();
		if (self.currentSize == size) return false;
		self.currentSize = size;
		return true;
	};

	/* ������ǂݍ��񂾎��_��
	   �����̑傫�����m�F���Ă��� */
	$(isChanged);

	/* �����̑傫�����ς���Ă�����A
	   handlers���̊֐������Ɏ��s */
	var observer = function() {
		if (!isChanged()) return;
		$.each(self.handlers, function(i, handler) {
			handler();
		});
	};

	/* �n���h����o�^���A
	   �ŏ��̓o�^�ł���΁A����������J�n */
	self.addHandler = function(func) {
		self.handlers.push(func);
		if (self.handlers.length == 1) {
			setInterval(observer, self.interval);
		}
	};

})(jQuery);

/*
======================================================================
	$(expr).flatHeights()
	$(expr)�őI�����������̗v�f�ɂ��āA���ꂼ�ꍂ����
	��ԍ������̂ɑ�����
======================================================================
*/

(function($) {

	/* �ΏۂƂȂ�v�f�Q�̏W�� */
	var sets = [];

	/* ���������̏����{�� */
	var flatHeights = function(set) {
		var maxHeight = 0;
		set.each(function(){
			var height = this.offsetHeight;
			if (height > maxHeight) maxHeight = height;
		});
		set.css('height', maxHeight + 'px');
	};

	/* �v�f�Q�̍����𑵂��Asets�ɒǉ� */
	jQuery.fn.flatHeights = function() {
		if (this.length > 1) {
			flatHeights(this);
			sets.push(this);
		}
		return this;
	};

	/* �����̑傫�����ς�������ɁA
	   sets�Ɋ܂܂��e�v�f�Q�ɑ΂��č������������s */
	$.changeLetterSize.addHandler(function() {
		$.each(sets, function() {
			this.height('auto');
			flatHeights(this);
		});
	});

})(jQuery);


/*
Copyright (c) 2007, KITAMURA Akatsuki

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
// JavaScript Document
Number.prototype.to = function (format) {
	format = Number.culture.patterns[format] || format;
	var parts = format.split('.');
	var decimals = 0;
	var showGroup = parts[0].indexOf(',') >= 0;
	var zeroPad = (parts[0].match(/0/g) || []).length;
	var negative = this < 0;

	if (parts.length == 2) {
		var mind = (parts[1].match(/0/g) || []).length;
		var maxd = mind + (parts[1].match(/#/g) || []).length;
		var curd = (this.toString().split('.')[1] || '').length;
		decimals = curd <= mind ? mind : (curd <= maxd ? curd : maxd);
	}

	var value = Math.abs(this).toFixed(decimals).split('.');
	while (value[0].length < zeroPad) { value[0] = '0' + value[0]; }
	if (showGroup) value[0] = value[0].replace(/\B(?=(\d{3})+(?!\d))/g, Number.culture.delimiters.group);
	return (negative ? '-' : '') + value.join(Number.culture.delimiters.decimal);
};

Date.prototype.to = function (format) {
	var value = this;
	var h = this.getHours();
	var ampm = Date.culture.ampm ? (h > 12 ? Date.culture.am : Date.culture.pm) : '';
	h = Date.culture.ampm && h > 12 ? h - 12 : h;

	format = Date.culture.patterns[format] || format;
	format = format.replace(/dd|d|MM|M|yyyy|yy|hh|h|mm|m|ss|s|tt|t/g, function (s) {
		if (s == 'dd') return value.getDate().to('00');
		else if (s == 'd') return value.getDate();
		else if (s == 'MM') return (value.getMonth() + 1).to('00');
		else if (s == 'M') return value.getMonth() + 1;
		else if (s == 'yyyy') return value.getFullYear();
		else if (s == 'yy') return value.getFullYear().toString().substr(2, 2);
		else if (s == 'hh') return h.to('00');
		else if (s == 'h') return h;
		else if (s == 'mm') return value.getMinutes().to('00');
		else if (s == 'm') return value.getMinutes();
		else if (s == 'ss') return value.getSeconds().to('00');
		else if (s == 's') return value.getSeconds();
		else if (s == 'tt') return ampm;
		else if (s == 't') return ampm.substr(0, 1);
	});

	return format;
};
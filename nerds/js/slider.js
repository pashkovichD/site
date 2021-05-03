$(document).ready(function() {
	$('.features-controls label').click(function() {				
		var label_for = $(this).attr('for');
		num = label_for.charAt(label_for.length - 1);
		$('.feature-item').css('display','none');
		$('.feature-item:nth-child(' + num + ')').css('display','block');
	});
});
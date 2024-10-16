A free locator component library for jQuery to be used with RapidAPI
https://rapidapi.com/kuriel07/api/location-provider API

see index.html for example application

how to include locator.js, call init when document loaded with your API key parameter (string)
[code]
<script src="js/locator.js" defer></script> 
<script>
$(document).ready(() => {
	locator.init('[put your api key here]');
});
</script>
[/code]

how to include component in your HTML, use class country-selector (required), state-selector and city-selector
[code]
<div style="display:flex;">
<button class="country-selector" name="country" id="country" value="US" placeholder="country" /></button>
<button class="state-selector" name="state" id="state" value="CA" placeholder="state" /></button>
<button class="city-selector" name="city" id="city" value="b07c99ffe328b3582343613958731b84" placeholder="city" /></button>
</div>
[/code]


don't forget to include jquery core, jquery UI library
[code]
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" crossorigin="anonymous" referrerpolicy="no-referrer" ></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js" crossorigin="anonymous" referrerpolicy="no-referrer" ></script>
[/code]
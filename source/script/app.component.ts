import { Component } from "@angular/core";

@Component({
	selector: "angular-test-app",
	template: `
		<div class="uk-panel uk-panel-box uk-panel-box-secondary uk-panel-box-secondary-hover">
			<div class="uk-panel-badge uk-badge">Работает</div>
			<h3 class="uk-panel-title">Приложение</h3>
			<p>Здесь расположен шаблон компонента</p>
		</div>
	`,
})

export class AppComponent {}
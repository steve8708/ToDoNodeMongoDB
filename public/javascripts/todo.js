jQuery(function($) {

	"use strict";

	var App = {
		init: function() {
			this.ENTER_KEY = 13;
			this.POST_URL = '/todos/add';
			this.MARK_AS_DONE_URL = '/todos/marktodo/';
			this.todos = this.store();
			this.cacheElements();
			this.bindEvents();
			this.render();
		},
		cacheElements: function() {
			this.$todoApp = $('#todoapp');
			this.$newTodo = $('#new-todo');
			this.$toggleAll = $('#toggle-all');
			this.$main = $('#main');
			this.$todoList = $('#todo-list');
			this.$footer = this.$todoApp.find('footer');
			this.$count = $('#todo-count');
			this.$clearBtn = $('#clear-completed');
		},
		store: function( data ) {
			if( data ) {
				$.post( App.POST_URL , data, function(data, textStatus, jqXHR) {
					App.appendTodo( data )
				});
			}

		},
		bindEvents: function() {
			var list = this.$todoList;
			this.$newTodo.on( 'keyup', this.create );
			$('.toggle').live('click',function() {
				
				var linha = $(this).parent().parent()	
				var todo_id = linha.attr('id')

				var status = linha.hasClass('done') ? 'none' : 'done';

				App.changeTodoStatus( todo_id, status );

				if( status !== 'done')
					$(this).attr('checked',false);


			})
		},
		create: function(e) {
			if ( e.which !== App.ENTER_KEY ) {
				return;
			}
			var $input = $(this),
				inputVal = $input.val();
			if ( !inputVal ) {
				return;
			}

			var this_todo = {
				title: inputVal,
				done: false
			}

			App.store( this_todo );

			$input.val('');
		},
		appendTodo: function( todo ) {
			$('#todo-list').append( App.template(todo) )
		},
		render: function() {
			$.getJSON('/todos/', function(data) {
			  var tam, i;

			  tam = data.length;

			  for( i=0; i < tam; i++ ) {
				$('#todo-list').append( App.template( data[i] ) )
			  }

			});
		},
		changeTodoStatus: function( id, status ) {
			var list = this.$todoList;

			if( status === 'done' ) {
				list.children('li#'+id)
					.addClass('done');
			} else {
				list.children('li#'+id)
					.removeClass('done');
			}

			App.markTodo( id, status );
		},
		markTodo: function( todoId, status ) {

			var data = {
				id: todoId,
				status: status 
			}

			$.post( App.MARK_AS_DONE_URL , data);
		},
		template: function( todo ) {
			var template, status,checked;

			status = todo.done ? 'done' : '';
			checked = status == 'done' ? 'checked="checked"' : '';

			template  = '<li id="' + todo._id +'" class="'+status+'">';
				template += '<div class="view">';
					template += '<input type="checkbox" class="toggle" '+checked+'/>';
					template += '<label>' + todo.title + '</label>';
					template += '<a class="destroy"></a>';
				template += '</div>';
				template += '<input type="text" value="' + todo.title + '" class="edit"/>';
			template += '</li>';

			return template;
		}

	};

	window.TodoApp = App.init();

});

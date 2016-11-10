
block('root').replace()(function(){
	var ret = { block: 'page' };
	if ( typeof this.ctx.data.page.map === 'function') {
		ret.content = this.ctx.data.page.map((user)=>{return {
				block: 'user',
				data:user
			}
		})
	}
	else 
		ret.content = {
			block: 'user',
			data: this.ctx.data.page
		}
	return ret;
})

block('user').content()(function(){
	return [
		{
			elem:'name',
			content: this.ctx.data.user
		},
		{
			elem: 'age',
			content: this.ctx.data.age
		},
		{
			elem: 'money',
			content: this.ctx.data.money
		}
	]
})
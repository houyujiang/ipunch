Component({
  properties: {
    title: {
      type: String
    },
    inputPlaceholder: {
      type: String
    }
  },
  data: {
    inputData: '',
    projectId:'',
    title: '',
    content: '',
    createTime:'',
  },
  methods: {
    onInput(e) {
      this.data.inputData = e.detail.value,
      this.data.title = e.detail.value,
      this.triggerEvent('input', e.detail.value, {})
    },
    onConfirm() {
      this.triggerEvent('confirm', this.data.inputData, {})
    },
    onCancel() {
      this.triggerEvent('cancel', {}, {})
    }
  }
  
})

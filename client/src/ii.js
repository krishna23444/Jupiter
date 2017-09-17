  name: {
    type: String,
   
  publicMethod: {
   type: Boolean

  },

   createdBy: {
        type: String,
       
        required: true
  },
   module: {
        type: String,
       
        required: true
  },
  category: {
        type: String,
        required: true
  },
  modality: {
        type: String,
        ref: 'Modality',
        required: true
    },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  ref: {
    type: String,

    required: true
  },
    updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
const { Note } = require("../models/note");

const addNote = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) 
      return res.status(400).json({ message: "Please fill all the fields" });
    
    const note = await Note.create({ ...req.body, userId: req.user.id });

    res.status(200).json({ note, message: "Note is successfully addedd" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    if (notes) 
        return res.status(200).json({ notes });
    
    res.status(400).json({ message: "Notes not found" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const deleteNote = async (req, res) => {
    try {
    if (!req.params.id) 
        return res.status(400).json({ message: "Id not found" });

    const note = await Note.findById(req.params.id);
    
    if (!note) 
        return res.status(400).json({ message: "This note not found" });
    
    if (note.userId !== req.user.id)
      return res.status(401).json({ message: "You cannot modify this note" });
    
    await note.remove()
    res.status(200).json({message: "Deleted successfully!"})

    } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const updateNote = async(req, res)=>{
    try{
        if (!req.params.id) return res.status(400).json({ message: "Id not found" });

        const note = await Note.findById(req.params.id);

        if (!note) 
            return res.status(400).json({ message: "This note not found" });

        if (note.userId !== req.user.id)
            return res.status(401).json({ message: "You cannot modify this note" });

        const updatenote = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        });

        res.status(200).json({message: "Updated successfully!"})
    }catch (error) {
        res.status(500).json({ message: "Internal server error!" });
      }
}

module.exports = {
    addNote,
    getNotes,
    updateNote,
    deleteNote
}
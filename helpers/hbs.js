const moment = require("moment");

module.exports = {
	formatDate: function (date, format) {
		return moment(date).format(format);
	},

	formatStory: function (story, len) {
        if (story.length > len) {
            story = story.substr(0, len) + "...";
        }
		return story;
	},

	editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if(storyUser._id.toString() === loggedUser._id.toString()){
            if(floating){
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab green">
                <i class="fas fa-edit fa-small"></i></a>`
            }
            else{
                return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
            }
        }
        else return "";
    },

    select: function (selected, options){
        return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
        )
    }
};

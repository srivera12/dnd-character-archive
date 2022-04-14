# DnD (Dungeons and Dragons) Character Archive

This is a simple application that allows you to store ideas for DnD characters.

## Features

There are several features in this application:

### Add Characters To Archive

Using the form below the character list, you can add a new character idea to the list. None of the fields are required, since it is possible to have an idea without being sure of all of the characteristics just yet. Simply use the 'Save Character' button when you are done. Your idea will appear on a character card at the list on the top.

### Edit Characters

Don't worry, whenever you decide on one of those characteristics you haven't set yet, or if you change your mind about a characteristic you did set, simply use the 'Edit Character' button near the bottom of the character card to open a form where you can edit anything you have set. Simply use the 'Save Character' button when you are done.

### Delete Character Ideas

If you have changed your mind about an idea, or want to remove a character who is in use or has died, simply press the 'Delete Character' button near the bottom of the character card.

**Note: this action is irreversible. Once deleted, you cannot recover your character idea.**

### Clear All Saved Characters

If for some reason you want to remove all of your character ideas, simply use the 'Clear Characters' button at the bottom of the add character form.

**Note: this action is irreversible. Once you clear your character archive, you cannot recover any of those character ideas.**

## Character Data Attributes

There are several characteristics that can be saved:

- Character Name
- Character Race (available options come from the [D&D 5e Api](https://www.dnd5eapi.co)), and are limited to the options from _The Player's Handbook_
- Character Class (available options come from the [D&D 5e Api](https://www.dnd5eapi.co)), and are limited to the options from _The Player's Handbook_
- Character Backstory, which you can write and edit with typical rich text options
- Whether or not the character is in use
- The date and time you created the character. This is automatically set and stored at UTC, but is displayed in your local time on the character card.

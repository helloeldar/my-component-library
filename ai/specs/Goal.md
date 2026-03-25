The main goal of this library is to create realistic prototypes that look and behave like real JetBrains IDEs.

Every existing component, such as toolwindow, should be easily editable.
So if prototype requires adding new elements, changing existing ones, or removing them, it should be possible to do so without having to rewrite the whole component.

There should be default content, and ability to add, or completely rewrite the content.
Example:
- Editor tabs: default 5 tabs, but i can override it with my own tabs. Tabs need name, type, and probably actions / triggers.\
- Tool window: content might be overridden with my own content. Tabs of existing tool windows, such as Terminal, maybe be overridden with my own tabs, but always should have default content.
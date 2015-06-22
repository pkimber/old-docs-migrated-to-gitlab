#!/bin/bash
dropboxes="dropbox-pat-hatherleigh-info dropbox-tom-hatherleigh-info"
for dropbox in $dropboxes
do
    HOME="/home/$USER/repo/files"
    if ! [ -d "$HOME/$dropbox" ]
    then
        mkdir "$HOME/$dropbox"
        ln -s "$HOME/.Xauthority" "$HOME/$dropbox/"
    fi
    HOME="$HOME/$dropbox"
    /home/$USER/.dropbox-dist/dropboxd &
done

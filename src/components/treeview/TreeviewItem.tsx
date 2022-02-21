import * as React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { GithubResponseViewModel } from '../github/viewmodel/GithubResponseViewModel';
import TreeviewItems from './TreeviewItems';

export interface ITreeviewItemProps {
    item: GithubResponseViewModel;
    onItemExpanded(item: GithubResponseViewModel): void;
    onItemCollapsed(item: GithubResponseViewModel): void;
}

export interface ITreeviewItemState {
    expanded: boolean,
    icon: EmotionJSX.Element,
    buttonColor: "inherit" | "primary" | "secondary" | "default" | "success" | "error" | "info" | "warning" | undefined
}

export default class TreeviewItem extends React.Component<ITreeviewItemProps, ITreeviewItemState> {

    constructor(props: ITreeviewItemProps) {
        super(props);

        this.state = {
            expanded: false,
            icon: <AddIcon sx={{ fontSize: '15px' }} />,
            buttonColor: "primary"
        }
    }

    private itemClicked(item: GithubResponseViewModel) {
        if (this.state.expanded) {
            this.setState(() => ({ expanded: false, icon: <AddIcon sx={{ fontSize: '15px' }} />, buttonColor: "primary" }));
            this.props.onItemCollapsed(item);
        } else {
            this.setState(() => ({
                expanded: true,
                icon: <RemoveIcon sx={{ fontSize: '15px' }} />,
                buttonColor: "default"
            }));
            this.props.onItemExpanded(item);
        }
    }

    public render() {
        return (
            <li >
                <Fab color={this.state.buttonColor} aria-label="expand" sx={{ mx: 1, my: 1, height: '20px', width: '20px', minHeight: '20px' }}
                    onClick={(e) => this.itemClicked(this.props.item)} >
                    {this.state.icon}
                </Fab>
                {this.props.item.label}
                {
                    this.props.item.children && 
                    <TreeviewItems items={this.props.item.children} onItemExpanded={this.props.onItemExpanded} onItemCollapsed={this.props.onItemCollapsed} />
                }
            </li>
        );
    }
}

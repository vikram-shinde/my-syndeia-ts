import * as React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { GithubResponseViewModel } from '../github/viewmodel/GithubResponseViewModel';
import { GithubServiceLocator } from '../github/domain/GithubServiceLocator';
import TreeviewItems from './TreeviewItems';

export interface ITreeviewItemProps {
    item: GithubResponseViewModel;
    //onItemCicked: (event: React.MouseEvent<HTMLElement>, item: TreeviewResponseViewModel) => void;
}

export interface ITreeviewItemState {
    childItems?: React.ReactNode
    expanded: boolean,
    icon: EmotionJSX.Element,
    buttonColor: "inherit" | "primary" | "secondary" | "default" | "success" | "error" | "info" | "warning" | undefined
}

export default class TreeviewItem extends React.Component<ITreeviewItemProps, ITreeviewItemState> {
    serviceLocator: GithubServiceLocator;

    constructor(props: ITreeviewItemProps) {
        super(props);
        this.serviceLocator = new GithubServiceLocator();

        this.state = {
            childItems: undefined,
            expanded: false,
            icon: <AddIcon sx={{ fontSize: '15px' }} />,
            buttonColor: "primary"
        }
    }

    private itemClicked(item: GithubResponseViewModel) {
        if (this.state.expanded) {
            this.setState(() => ({ childItems: [], expanded: false, icon: <AddIcon sx={{ fontSize: '15px' }} />, buttonColor: "primary" }));
        } else {
            const items = this.serviceLocator.execute({ model: item.model, id: item.id });
            this.setState(() => ({ childItems: <TreeviewItems items={items} />, expanded: true, icon: <RemoveIcon sx={{ fontSize: '15px' }} />, buttonColor: "default" }));
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
                {this.state.childItems}
            </li>
        );
    }
}

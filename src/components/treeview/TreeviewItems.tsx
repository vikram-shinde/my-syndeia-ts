import * as React from "react";
import { GithubResponseViewModel } from './../github/viewmodel/GithubResponseViewModel';
import TreeviewItem from './TreeviewItem';

export interface ITreeviewItemsProps {
    items?: Array<GithubResponseViewModel>;
}

export interface ITreeviewItemsState { }

export default class TreeviewItems extends React.Component<
    ITreeviewItemsProps,
    ITreeviewItemsState
> {
    constructor(props: ITreeviewItemsProps) {
        super(props);

        this.state = {};
    }

    public render() {
        return <ul style={{listStyleType: "none"}}>{this.props.items && this.props.items.map((item) => (
            <TreeviewItem key={item.id} item={item}/>
        ))}</ul>
    }
}

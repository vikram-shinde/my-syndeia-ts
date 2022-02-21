import * as React from "react";
import { GithubResponseViewModel } from './../github/viewmodel/GithubResponseViewModel';
import TreeviewItem from './TreeviewItem';

export interface ITreeviewItemsProps {
  items: Array<GithubResponseViewModel>;
  onItemExpanded(item: GithubResponseViewModel): void;
  onItemCollapsed(item: GithubResponseViewModel): void;
}

export interface ITreeviewItemsState {
}

export default class TreeviewItems extends React.Component<
    ITreeviewItemsProps,
    ITreeviewItemsState
> {
    constructor(props: ITreeviewItemsProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return <ul style={{ listStyleType: "none" }}>{this.props.items && this.props.items.map((item) => (
            <TreeviewItem key={item.id} item={item} onItemExpanded={this.props.onItemExpanded} onItemCollapsed={this.props.onItemCollapsed}/>
        ))}</ul>
    }
}

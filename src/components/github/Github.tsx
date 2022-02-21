import * as React from 'react';
import { GithubServiceLocator } from './domain/GithubServiceLocator';
import { GithubResponseViewModel } from './viewmodel/GithubResponseViewModel';
import TreeviewItems from './../treeview/TreeviewItems';

export interface IGithubProps {
}

export interface IGithubState {
  items: Array<GithubResponseViewModel>;
}

export default class Github extends React.Component<IGithubProps, IGithubState> {
  serviceLocator: GithubServiceLocator;

  constructor(props: IGithubProps) {
    super(props);
    this.serviceLocator = new GithubServiceLocator();
    this.onItemExpanded = this.onItemExpanded.bind(this);
    this.onItemCollapsed = this.onItemCollapsed.bind(this);

    this.state = {
      items: []
    }
  }

  private onItemExpanded(item: GithubResponseViewModel) {
    let stateItems = [...this.state.items];
    let foundItem = this.findInArray(stateItems, item);
    if (foundItem) {
      foundItem.children = this.serviceLocator.execute({ model: item.model, id: item.id });
      this.setState(() => ({ items: stateItems }));
    }
  }

  private findInArray(items: Array<GithubResponseViewModel>, itemTofind: GithubResponseViewModel): GithubResponseViewModel | undefined {
    for (let index = 0; index < items.length; index++) {
      const itm = items[index];
      if (itm.id == itemTofind.id)
        return itemTofind;
      else
        return this.findInArray(itm.children, itemTofind);
    }
  }

  private onItemCollapsed(item: GithubResponseViewModel) {

  }

  componentDidMount() {
    this.setState(() => ({ items: this.serviceLocator.execute({ model: undefined, id: 1 }) }));//load first set of nodes for tree
  }

  public render() {
    return (
      <div>
        <TreeviewItems items={this.state.items} onItemExpanded={this.onItemExpanded} onItemCollapsed={this.onItemCollapsed} />
      </div>
    );
  }
}

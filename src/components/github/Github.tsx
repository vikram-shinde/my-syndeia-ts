import * as React from 'react';
import { GithubServiceLocator } from './domain/GithubServiceLocator';
import { GithubResponseViewModel } from './viewmodel/GithubResponseViewModel';
import TreeviewItems from './../treeview/TreeviewItems';
import { GithubRequest } from './model/Request';

export interface IGithubProps {
}

export interface IGithubState {
  items: Array<GithubResponseViewModel>;
}

export default class Github extends React.Component<IGithubProps, IGithubState> {
  serviceLocator: GithubServiceLocator;
  currentSelection: { key: string, value: string }[]

  constructor(props: IGithubProps) {
    super(props);
    this.serviceLocator = new GithubServiceLocator();
    this.currentSelection = [];
    this.onItemExpanded = this.onItemExpanded.bind(this);
    this.onItemCollapsed = this.onItemCollapsed.bind(this);

    this.state = {
      items: []
    }
  }

  private updateCurrentSelection(expanded: boolean, item: GithubResponseViewModel) {
    let index = this.currentSelection.findIndex(selection => selection.key === item.currentModel);
    if (index >= 0) {
      this.currentSelection.splice(index);
      if (expanded) this.currentSelection.push({ key: item.currentModel, value: item.label });
    } else {
      this.currentSelection.push({ key: item.currentModel, value: item.label });
    }

    console.log("this.currentSelection", this.currentSelection);
  }

  private onItemExpanded(item: GithubResponseViewModel) {
    let stateItems = [...this.state.items];
    let foundItem = this.findInArray(stateItems, item);
    
    if (foundItem) {
      let fItem = foundItem;
      this.updateCurrentSelection(true, item);
      
      this.serviceLocator.execute(new GithubRequest(fItem.model, this.currentSelection))
        .then(data => {
          fItem.children = data;
          this.setState(() => ({ items: stateItems }));
        });
    }
  }

  private findInArray(items: Array<GithubResponseViewModel>, itemTofind: GithubResponseViewModel): GithubResponseViewModel | undefined {
    for (let index = 0; index < items.length; index++) {

      let foundItem = undefined;

      if (items[index].children && items[index].children.length > 0)
        foundItem = this.findInArray(items[index].children, itemTofind);

      if (!foundItem) {
        if (items[index].label === itemTofind.label)
          return items[index];
        else continue;
      } else return foundItem;
    }
  }

  private onItemCollapsed(item: GithubResponseViewModel) {
    let stateItems = [...this.state.items];
    let foundItem = this.findInArray(stateItems, item);
    if (foundItem) {
      foundItem.children = [];
      this.setState(() => ({ items: stateItems }));
      this.updateCurrentSelection(false, item);
    }
  }

  componentDidMount() {
    //load first set of nodes for tree
    this.serviceLocator.execute(new GithubRequest(undefined, this.currentSelection))
      .then(data => {
        this.setState(() => ({ items: data }));
      });
  }

  public render() {
    return (
      <div>
        <TreeviewItems items={this.state.items} onItemExpanded={this.onItemExpanded} onItemCollapsed={this.onItemCollapsed} />
      </div>
    );
  }
}
